import React from "react";
import { useSelector } from "react-redux";
import { Feeds } from "../../components/dashboard";
import ContratistaStats from "../../components/dashboard/stats2/ContratistaStats";
// import AntStats2 from "../../components/dashboard/stats2/AntStats2";
// import { AuthenticationService } from "../../jwt/_services";


const MainDashboard = (props) => {
    // const currentUser = AuthenticationService.currentUserValue
    const auth = useSelector(state => state.auth);
    return (<div>
        <h1
            style={{
                textAlign: "center",
                color: "cornflowerblue",
                fontStyle: "italic",
                fontWeight: "bold",
            }}
        >
            {"Sistema de Gestión para Registro de Contratistas"}
        </h1>
        {/* <h3>{" Bienvenido " + (auth.data_user.id_perfil === 2 ? auth.data_user.contratista.razonSocial : auth.data_user.nombres)}</h3> */}
        <h3>Informes </h3>
        <ContratistaStats />
        {
            auth.data_user.id_perfil === 1 ? <Feeds /> : null
        }
        {/* <AntStats2 /> */}

    </div>);
}

export default MainDashboard;