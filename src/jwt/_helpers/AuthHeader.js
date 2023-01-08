import { AuthenticationService } from "../_services";

export function AuthHeader(content_type='application/json') {
  // return authorization header with jwt access_token
  const currentUser = AuthenticationService.currentUserValue;
  if (currentUser && currentUser.user.token) {
    // return { 'Content-Type': content_type, Authorization: `Bearer ${currentUser.user.token}` };

    var cabecera ={ Authorization: `Bearer ${currentUser.user.token}` };
    if(content_type !== null){
      cabecera = {...cabecera,  'Content-Type': content_type};
    }
    return cabecera;
  } else {
    return {'Accept' : 'application/json','Content-Type' : 'application/json'};
  }
}
