// import axios from "axios";

import { AuthenticationService, MantenimientosService } from "../../jwt/_services";
import { setLoginError } from "../auth/authDucks";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";

//constantes

const obrainit = {
  data: [],
  obra: [],
  obras_inactivas : [],
  isfetching: false,
  //   offset: 0,
};
//types
export const AGREGAR_OBRAS = "AGREGAR_OBRAS";
export const SET_FETCHING_OBRAS = "SET_FETCHING_OBRAS";
export const AGG_OBRAS_INACTIVAS = "AGG_OBRAS_INACTIVAS";
export const AGREGAR_OBRA = "AGREGAR_OBRA";
//reducer

export default function obrasReducer(state = obrainit, action) {
  switch (action.type) {
    case AGREGAR_OBRA:
      return { ...state, obra: action.payload };
    case AGREGAR_OBRAS:
      return { ...state, data: action.payload };
    //   case LIMPIAR_TAGS:
    //     return {  ...state, data: action.payload };
    //   case SET_TIEMPO_OBRAS:
    //     return {  ...state, tiempo_fin: action.payload };
    case SET_FETCHING_OBRAS:
      return { ...state, isfetching: action.payload };
    case AGG_OBRAS_INACTIVAS:
      return { ...state, obras_inactivas: action.payload };  
    default:
      return state;
  }
}

//acciones

export const aggObras = (obj = {}) => async (dispatch, getState) => {
  try {
    dispatch(ObrasFetching(true));
    MantenimientosService.filtrarObras(obj)
      .then((result) => {
        var obras = result.text.obra;
        var obras_inactivas = result.text.obras_inactivas;
        console.log(obras_inactivas);
        // if(result.status === 400 && result.text.message === 'El token ha expirado. Por favor contactarse con el administrador del sistema.'){
        //   dispatch(setLoginError());
        //   AuthenticationService.logout();
        // }
        dispatch({ type: AGREGAR_OBRAS, payload: obras });
        dispatch({ type: AGG_OBRAS_INACTIVAS, payload: obras_inactivas });
      })
      .finally(() => {
        dispatch(ObrasFetching(false));
      });
  } catch (err) {
    console.log(err);
  }
};

export const ObrasFetching = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_FETCHING_OBRAS, payload: obj });
  } catch (err) {
    console.log(err);
  }
};

export const aggObra = (obj = {}) => async (dispatch, getState) => {
  try {
    dispatch(ObrasFetching(true));
    MantenimientosService.filtrarObras(obj)
      .then((result) => {
        console.log(result);
        if (result.status === 400 && result.text.message === "El token ha expirado. Por favor contactarse con el administrador del sistema.") {
          dispatch(setLoginError());
          AuthenticationService.logout();
        }
        dispatch({ type: AGREGAR_OBRA, payload: result.text.obra });
      })
      .finally(() => {
        dispatch(ObrasFetching(false));
      });
  } catch (err) {
    console.log(err);
  }
}
