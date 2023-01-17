// import axios from "axios";

import { MantenimientosService } from "../../jwt/_services";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";

//constantes

const empleadoinit = {
  data: [],
  empleado: {},
  isfetching: false,
  //   offset: 0,
};
//types
export const INDEX_EMPLEADO = "INDEX_EMPLEADO";
export const SET_EMPLEADO = "SET_EMPLEADO";
export const SET_FETCHING_EMPLEADOS = "SET_FETCHING_EMPLEADOS";
//reducer

export default function empleadoReducer(state = empleadoinit, action) {
  switch (action.type) {
    case INDEX_EMPLEADO:
      return { ...state, data: action.payload };
    //   case LIMPIAR_TAGS:
    //     return {  ...state, data: action.payload };
    //   case SET_TIEMPO_OBRAS:
    //     return {  ...state, tiempo_fin: action.payload };
    case SET_FETCHING_EMPLEADOS:
      return { ...state, isfetching: action.payload };
    default:
      return state;
  }
}

//acciones

export const aggEmpleados =
  (obj = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch(loadEmpleado(true));
      MantenimientosService.filtrarEmpleados(obj)
        .then((result) => {
          console.log(result);
          var empleados = result.text.empleado;
          dispatch({ type: INDEX_EMPLEADO, payload: empleados });
        })
        .finally(() => {
          dispatch(loadEmpleado(false));
        });
    } catch (err) {
      console.log(err);
    }
  };

export const loadEmpleado = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_FETCHING_EMPLEADOS, payload: obj });
  } catch (err) {
    console.log(err);
  }
};

export const crearEmpleado = (obj) => async (dispatch, getState) => {
  try {
    dispatch(loadEmpleado(true));
    MantenimientosService.crearEmpleado(obj)
      .then((result) => {
        console.log(result);
        var empleado = result.text.empleado;
        dispatch({ type: SET_EMPLEADO, payload: empleado });
      })
      .finally(() => {
        dispatch(loadEmpleado(false));
      });
  } catch (err) {
    console.log(err);
  }
};
