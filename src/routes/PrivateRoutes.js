import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../jwt/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = AuthenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: "/authentication/Login",
              state: { from: props.location },
            }}
          />
        );
      }  else {
        if (props.location.pathname === "/") {
          var path = "/dashboards/main";
          //console.log(currentUser.user.id_perfil);
          // if (parseInt(currentUser.user.id_perfil) === 34) {
          //   //  console.log("currentUser.user.id_perfil");
          //   // console.log(currentUser.user.id_perfil);
          //   path = "/ecommerce/catalogo";
          // }
          // if (parseInt(currentUser.user.id_perfil) === 38) {
          //   path = "/Kipit-Home";
          // }
          return (
            <Redirect
              to={{
                //pathname: "/inicio/formularioDatos",
                pathname: path,
                state: { from: props.location },
              }}
            />
          );
        } else {

          return <Component {...props} />;
        }
      }
    }}
  />
);

export default PrivateRoute;
