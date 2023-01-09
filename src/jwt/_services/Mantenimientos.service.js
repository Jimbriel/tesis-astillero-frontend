import { Url } from "./Url.service";
import { HandleResponse, AuthHeader } from "../_helpers";
export const MantenimientosService = {
  // listarPerfil,
  filtrarPerfil,
  crearPerfil,
  actualizarPerfil,

  filtrarUsuarios,
  actualizarUsuario,
  crearUsuario,
};
function crearUsuario(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/crearUsuario`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function actualizarUsuario(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/actualizarUsuario`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function filtrarUsuarios(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/filtrarUsuarios`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function filtrarPerfil(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/filtrarPerfil`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function crearPerfil(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/crearPerfil`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function actualizarPerfil(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/actualizarPerfil`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
