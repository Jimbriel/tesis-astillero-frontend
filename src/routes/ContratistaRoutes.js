import { lazy } from "react";

// const Analytical = lazy(() => import("../views/dashboards/Analytical"));
// const Demographical = lazy(() => import("../views/dashboards/Demographical"));
// const Modern = lazy(() => import("../views/dashboards/Modern"));
const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
const Perfil = lazy(() => import("../mantenimientos/Perfil/Perfil"));
const Usuario = lazy(() => import("../mantenimientos/Usuarios/Usuario"));


var ThemeRoutes = [
  
  {
    navlabel: true,
    name: "Administracion",
    icon: "",
  },
  {
    collapse: true,
    path: "/empleados",
    name: "Empleados",
    state: "empleadospages",
    icon: "fa fa-wrench",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
     
      {
        path: "/empleados/registro",
        name: "Registro",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Usuario,
      },
    ],
  },
  
];
export default ThemeRoutes;
