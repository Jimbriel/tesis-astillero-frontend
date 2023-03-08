import Link from "antd/lib/typography/Link";
import { lazy } from "react";

// const Analytical = lazy(() => import("../views/dashboards/Analytical"));
// const Demographical = lazy(() => import("../views/dashboards/Demographical"));
// const Modern = lazy(() => import("../views/dashboards/Modern"));
const MainDashboard = lazy(() => import("../views/dashboards/MainDashboard"));
const Perfil = lazy(() => import("../mantenimientos/Perfil/Perfil"));
const Obras = lazy(() => import("../mantenimientos/Obras/Obras"));
const Obra = lazy(() => import("../mantenimientos/Obras/Obra"));
const Usuario = lazy(() => import("../mantenimientos/Usuarios/Usuario"));
const Empresa = lazy(() => import("../mantenimientos/Empresa/Empresa"));
const Contratista = lazy(() => import("../mantenimientos/Empresa/Contratista"));
const ContratistaEmpleado = lazy(() => import("../mantenimientos/Empleado/ContratistaEmpleado"));
const Empleado = lazy(() => import("../mantenimientos/Empleado/Empleado"));
//-----------------------------------------------------------------------------------
// const ReporteObras = lazy(() => import("../reportes/ReporteObras"));
// const ReporteContratistas = lazy(() => import("../reportes/ReporteContratistas"));
// const ReporteEmpleados = lazy(() => import("../reportes/ReporteEmpleados"));
const ReportesGenerales = lazy(() => import("../reportes/ReportesGenerales"));
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
        path: "/mantenimientos/empresas",
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
        path: "/mantenimientos/empleados",
        name: "Empleado",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Empleado,
      },
      {
        path: "/reportes/reportesgenerales",
        name: "Reporte General",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: ReportesGenerales,
        // href: "http://localhost:90/api/Reportes/ReporteGeneral/"
      },
      {
        path: "/mantenimientos/documentos/:id",
        name: "Documento",
        mini: "B",
        hidden: true,
        icon: "mdi mdi-adjust",
        component: Documento,
      },
      {
        hidden: true,
        path: "/mantenimientos/obra/:id",
        name: "Obras",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Obra,
      },
      {
        hidden: true,
        path: "/mantenimientos/empleado/:id",
        name: "Obras",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: ContratistaEmpleado,
      },
      {
        hidden: true,
        path: "/mantenimientos/contratista/:id",
        name: "Empresa",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Contratista,
      },
    ],
  },
  //Reportes
  // {
  // collapse: true,
  // path: "/api/Reportes/ReporteGeneral/",
  // name: "Reporte General",
  // icon: "fa fa-wrench",
  // badges: "side-badge badge badge-info",
  // href: "http://localhost:90/api/Reportes/ReporteGeneral/"
  // badgeno: "3",
  // child: [
  //   {
  //     path: "/reportes/obras",
  //     name: "Reporte Obras",
  //     mini: "B",
  //     icon: "mdi mdi-adjust",
  //     component: ReporteObras,
  //   },
  //   {
  //     path: "/reportes/contratistas",
  //     name: "Reporte Contratistas",
  //     mini: "B",
  //     icon: "mdi mdi-adjust",
  //     component: ReporteContratistas,
  //   },
  //   {
  //     path: "/reportes/empleados",
  //     name: "Reporte Empleados",
  //     mini: "B",
  //     icon: "mdi mdi-adjust",
  //     component: ReporteEmpleados,
  //   },
  //   {
  //     path: "/reportes/reportegeneral",
  //     name: "Reporte General",
  //     mini: "B",
  //     icon: "mdi mdi-adjust",
  //     component: ReportesGenerales,
  //   },
  // ],
  // },

];
export default ThemeRoutes;
