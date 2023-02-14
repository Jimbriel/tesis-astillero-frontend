import React from "react";
// import { useSelector } from "react-redux";
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
      } else {
        if (props.location.pathname === "/" || props.location.state === undefined) {
          // if (
          //   parseInt(currentUser.user?.id_perfil) === 1 &&
          //   props.location.state === undefined
          // ) {
          // console.log(auth.data_user?.perfil);
          var path = "/dashboards/analytical";
          if (parseInt(currentUser.user?.id_perfil) === 1 || parseInt(currentUser.user?.id_perfil) === 2) {
            //  console.log("currentUser.user.id_perfil");
            // console.log(currentUser.user.id_perfil);
            path = "/dashboards/main";
          }
          // if (parseInt(auth.data_user?.perfil) === 38) {
          //   path = "/Kipit-Home";
          // }
          // if(props.location.state === undefined){

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
          // } else {
          //   return <Component {...props} />;
          // }
        } else {
          return <Component {...props} />;
        }
      }
    }}
  />
);

export default PrivateRoute;
