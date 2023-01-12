// import axios from "axios";

import { MantenimientosService } from "../../jwt/_services";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";

//constantes

const taginit = {
  data: [],
  obra: {},
  isfetching: false,
  //   offset: 0,
};
//types
export const AGREGAR_OBRAS = "AGREGAR_OBRAS";
export const SET_FETCHING_OBRAS = "SET_FETCHING_OBRAS";
//reducer

export default function obrasReducer(state = taginit, action) {
  switch (action.type) {
    case AGREGAR_OBRAS:
      return { ...state, data: action.payload };
    //   case LIMPIAR_TAGS:
    //     return {  ...state, data: action.payload };
    //   case SET_TIEMPO_OBRAS:
    //     return {  ...state, tiempo_fin: action.payload };
    case SET_FETCHING_OBRAS:
      return { ...state, isfetching: action.payload };
    default:
      return state;
  }
}

//acciones

export const aggObras = (obj) => async (dispatch, getState) => {

  try {
    MantenimientosService.filtrarObras()
      .then((result) => {
        console.log(result);
        var obras = result.text.obras;
        dispatch({ type: AGREGAR_OBRAS, payload: obras });
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
