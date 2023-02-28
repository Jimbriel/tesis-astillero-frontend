import { AuthenticationService } from "../_services";

export function HandleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    // console.log(data);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        AuthenticationService.logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    if (data.status === 403) {
      window.location.reload(true);
      AuthenticationService.logout();
      return data;
    }

    return data;
  });
}
