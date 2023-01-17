import { lazy } from "react";

// const Analytical = lazy(() => import("../views/dashboards/Analytical"));
// const Demographical = lazy(() => import("../views/dashboards/Demographical"));
// const Modern = lazy(() => import("../views/dashboards/Modern"));
const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
const Perfil = lazy(() => import("../mantenimientos/Perfil/Perfil"));
const Obras = lazy(() => import("../mantenimientos/Obras/Obras"));
const Usuario = lazy(() => import("../mantenimientos/Usuarios/Usuario"));
const Empresa = lazy(() => import("../mantenimientos/Empresa/Empresa"));
const Empleado = lazy(() => import("../mantenimientos/Empleado/Empleado"));


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
    name: "Mantenimientos",
    state: "mantenimientospages",
    icon: "fa fa-wrench",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/mantenimientos/perfil",
        name: "Perfil",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Perfil,
      },
      {
        path: "/mantenimientos/usuario",
        name: "Usuario",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Usuario,
      },
      {
        path: "/mantenimientos/empresa",
        name: "Empresa",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Empresa,
      },
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
    ],
  },
  
];
export default ThemeRoutes;
