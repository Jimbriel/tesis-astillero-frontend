// import axios from "axios";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";

//constantes

const INIT_STATE = {
  authReducerResponse: "default",
  data_user: {},
  data_menu: [],
  data_permissions: {},
  isAuthenticated: false,
  time_token: 0,
  end_token: null,
  isFetching: false,
};
//types
export const LOGIN_RENEW_TOKEN = "LOGIN_RENEW_TOKEN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
//reducer

export default function authReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case LOGIN_RENEW_TOKEN:
      return {
        ...state,
        end_token: new Date().setSeconds(
          new Date().getSeconds() + action.payload
        ),
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        data_user: action.payload.user,
        // data_menu: action.payload.menu_data,
        // data_permissions: action.payload.permission_data,

        time_token: action.payload.user.expires_in,
        end_token: new Date().setSeconds(
          new Date().getSeconds() + action.payload.user.expires_in
        ), //sumando el tiempo actual con el tiempo del token ...
        isAuthenticated: true,
        isFetching: false,
        // nivel: action.payload.nivel,
      };
    case LOGIN_ERROR:
      return {
        authReducerResponse: "default",
        data_user: {},
        // data_menu: [],
        // data_permissions: {},
        time_token: 0,
        end_token: null,
        isAuthenticated: false,
        isFetching: false,
      };
    default:
      return state;
  }
}

//acciones

export const setLoginRenewToken = (payload) => {
  return {
    type: LOGIN_RENEW_TOKEN,
    payload,
  };
};

export const setLoginError = (payload) => {
  return {
    type: LOGIN_ERROR,
    payload,
  };
};

export const setLoginSuccess = (obj) => async (dispatch, getState) => {
  try {
    // const { from } = obj.location || {
    //   from: { pathname: "/" },
    // };
    // const res= await axios.get('http://192.168.14.72:8000/api/inventario/listarTags');

    dispatch({ type: LOGIN_SUCCESS, payload: obj });
  } catch (err) {
    console.log(err);
  }

  // return {
  //   type: LOGIN_SUCCESS,
  //   payload: obj,
  // };
};
