import { lazy } from "react";

// const Analytical = lazy(() => import("../views/dashboards/Analytical"));
// const Demographical = lazy(() => import("../views/dashboards/Demographical"));
// const Modern = lazy(() => import("../views/dashboards/Modern"));
// const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
// const Perfil = lazy(() => import("../mantenimientos/Perfil/Perfil"));
// const Usuario = lazy(() => import("../mantenimientos/Usuarios/Usuario"));

const Obras = lazy(() => import("../mantenimientos/Obras/Obras"));
const Empleado = lazy(() => import("../mantenimientos/Empleado/Empleado"));
const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
const Documento = lazy(() => import("../mantenimientos/Documentos/Documento"));

var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "",
  },
  {
    collapse: true,
    path: "/dashboards",
    name: "Dashboards",
    state: "dashboardpages",
    icon: "home",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
       {
        path: "/dashboards/main",
        name: "Main Dashboard",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: MainDashboard,
      },
  
    ],
  },
  
  {
    navlabel: true,
    name: "Administracion",
    icon: "",
  },
  {
    collapse: true,
    path: "/mantenimientos",
    name: "Empleados",
    state: "empleadospages",
    icon: "fa fa-wrench",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
     
      // {
      //   path: "/empleados/registro",
      //   name: "Registro",
      //   mini: "B",
      //   icon: "mdi mdi-adjust",
      //   component: Usuario,
      // },
     
      {
        path: "/mantenimientos/obras",
        name: "Obras",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Obras,
      },
      {
        path: "/mantenimientos/empleado",
        name: "Empleado",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Empleado,
      },
      {
        path: "/mantenimientos/documentos/:id",
        name: "Documentos",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Documento,
      },
    ],
  },
  
];
export default ThemeRoutes;
