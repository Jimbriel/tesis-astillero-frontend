import { lazy } from "react";

// const Analytical = lazy(() => import("../views/dashboards/Analytical"));
// const Demographical = lazy(() => import("../views/dashboards/Demographical"));
// const Modern = lazy(() => import("../views/dashboards/Modern"));
const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
const Perfil = lazy(() => import("../mantenimientos/Perfil/Perfil"));


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
    icon: "fa fa-wrench	",
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
    ],
  },
  
];
export default ThemeRoutes;
