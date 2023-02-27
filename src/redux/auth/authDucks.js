// import axios from "axios";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";
import AdminRoutes from "../../routes/AdminRoutes";
import RoutesMain from "../../routes/Router";
import ContratistaRoutes from "../../routes/ContratistaRoutes";
import { MantenimientosService } from "../../jwt/_services";

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
  isFetchingContratista: false,
};
//types
export const LOGIN_RENEW_TOKEN = "LOGIN_RENEW_TOKEN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_CONTRATISTA = "SET_CONTRATISTA";
export const SET_CONTRATISTA_CARGANDO = "SET_CONTRATISTA_CARGANDO";
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
        data_menu: (action.payload.user?.id_perfil === 1) ? AdminRoutes : (action.payload.user?.id_perfil === 2 ? ContratistaRoutes : RoutesMain),
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
    case SET_CONTRATISTA_CARGANDO:
      return {
        ...state,
        isFetchingContratista: action.payload,
      }
    case SET_CONTRATISTA:
      return {
        ...state,
        data_user: action.payload,
      }
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

export const obtenerContratista = (obj = null) => async (dispatch, getState) => {
  const { data_user } = getState().auth;
  try {
    var id_contratista = obj?.id_contratista !== undefined ? obj?.id_contratista : data_user.contratista?.id;

    if (id_contratista) {
      var send = {
        id: id_contratista
      }
      dispatch(setContratistaCargando(true));
      MantenimientosService.obtenerContratista(send).then((res) => {
        console.log(res.text.contratista);
        data_user.contratista = res.text.contratista;
        dispatch({ type: SET_CONTRATISTA, payload: data_user });
      }).finally(() => {
        dispatch(setContratistaCargando(false));
      });
    }

  } catch (err) {
    console.log(err);
  }


}

export const setContratistaCargando = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_CONTRATISTA_CARGANDO, payload: obj });
  } catch (err) {
    console.log(err);
  }
};
