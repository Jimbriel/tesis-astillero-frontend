import { Url } from "./Url.service";
import { HandleResponse, AuthHeader } from "../_helpers";
export const MantenimientosService = {
  // listarPerfil,
  filtrarPerfil,
  crearPerfil,
  actualizarPerfil,

  filtrarUsuarios,
  filtrarContratista,
  actualizarUsuario,
  crearUsuario,
  crearContratista,
  actualizarContratista,
};
function actualizarContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/actualizarContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function filtrarContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/filtrarContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function crearContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/crearContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
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
