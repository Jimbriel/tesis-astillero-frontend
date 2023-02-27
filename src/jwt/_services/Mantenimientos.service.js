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
  actualizarContratistaRegistro,
  filtrarObras,
  filtrarEmpleados,
  crearObra,
  actualizarObra,
  crearEmpleado,
  actualizarEmpleado,
  validarCodigoRegistro,
  subirDocumentoContratista,
  obtenerContratista,
  updateDocumentoContratista,
};

function updateDocumentoContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/updateDocumentoContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function subirDocumentoContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/subirDocumentoContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function obtenerContratista(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/obtenerContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function actualizarContratistaRegistro(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}auth/actualizarContratista`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function validarCodigoRegistro(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}auth/verificarCodigo`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function actualizarEmpleado(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/actualizarEmpleado`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function filtrarEmpleados(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/filtrarEmpleados`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function crearEmpleado(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/crearEmpleado`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function actualizarObra(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/actualizarObra`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function crearObra(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/crearObra`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
function filtrarObras(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${Url}mantenimientos/filtrarObras`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}
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
