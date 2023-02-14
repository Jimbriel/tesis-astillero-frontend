import React from "react";
import ContratistaStats from "../../components/dashboard/stats2/ContratistaStats";
// import AntStats2 from "../../components/dashboard/stats2/AntStats2";
// import { AuthenticationService } from "../../jwt/_services";


const MainDashboard = (props) => {
    // const currentUser = AuthenticationService.currentUserValue
    return (<div>
        <ContratistaStats/>
        
        {/* <AntStats2 /> */}
        
    </div> );
}
 
export default MainDashboard;