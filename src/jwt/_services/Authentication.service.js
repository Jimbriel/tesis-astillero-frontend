import { BehaviorSubject } from "rxjs";

import { AuthHeader, HandleResponse } from "../_helpers";
import { Url } from "./Url.service";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);


export const AuthenticationService = {
  verificarCorreo,
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function verificarCorreo(data) {
  const requestOptions = {
    method: "post",
    headers: AuthHeader(),
    body: JSON.stringify(data),
  };


  return fetch(`${Url}auth/verificarCorreo`, requestOptions)
    .then(HandleResponse)
    .then((response) => {
      return response;
    });
}

function login(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${Url}auth/login`, requestOptions)
    .then(HandleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.clear('persist:persistedStore');
  localStorage.clear('persist:root');
  localStorage.clear();
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  window.location.href="/authentication/login";
}
