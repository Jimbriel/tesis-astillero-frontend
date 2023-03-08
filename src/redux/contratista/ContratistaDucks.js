// import axios from "axios";

import { AuthenticationService, MantenimientosService } from "../../jwt/_services";
import { setLoginError } from "../auth/authDucks";

// import { useHistory } from "react-router-dom";
// import { AuthenticationService } from "../../jwt/_services";

//constantes

const empleadoinit = {
    data: [],
    empleado: {},
    aprobados: [],
    pendientes: [],
    isfetching: false,
    //   offset: 0,
};
//types
export const INDEX_CONTRATISTA = "INDEX_CONTRATISTA";
export const SET_CONTRATISTA = "SET_CONTRATISTA";
export const SET_FETCHING_CONTRATISTA = "SET_FETCHING_CONTRATISTA";
export const INDEX_APROBADOS = "INDEX_APROBADOS";
export const INDEX_PENDIENTES = "INDEX_PENDIENTES";
//reducer

export default function contratistaReducer(state = empleadoinit, action) {
    switch (action.type) {
        case INDEX_CONTRATISTA:
            return { ...state, data: action.payload };
        case INDEX_APROBADOS:
            return { ...state, aprobados: action.payload };
        case INDEX_PENDIENTES:
            return { ...state, pendientes: action.payload };
        //   case LIMPIAR_TAGS:
        //     return {  ...state, data: action.payload };
        //   case SET_TIEMPO_OBRAS:
        //     return {  ...state, tiempo_fin: action.payload };
        case SET_FETCHING_CONTRATISTA:
            return { ...state, isfetching: action.payload };
        default:
            return state;
    }
}

//acciones

export const aggContratistas =
    (obj = {}) =>
        async (dispatch, getState) => {
            try {
                dispatch(loadContratista(true));
                MantenimientosService.filtrarContratista(obj)
                    .then((result) => {
                        if (result.status === 400) {
                            dispatch(setLoginError());
                            AuthenticationService.logout();
                        }
                        var empleados = result.text.contratistas;
                        dispatch({ type: INDEX_CONTRATISTA, payload: empleados });
                        dispatch({ type: INDEX_APROBADOS, payload: result.text.contratistas_aprobados });
                        dispatch({ type: INDEX_PENDIENTES, payload: result.text.contratistas_pendientes });
                    })
                    .finally(() => {
                        dispatch(loadContratista(false));
                    });
            } catch (err) {
                console.log(err);
            }
        };

export const loadContratista = (obj) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_FETCHING_CONTRATISTA, payload: obj });
    } catch (err) {
        console.log(err);
    }
};

