import React from "react";

import {
    Card,
    Col,
    Row
} from 'antd';

/* import img1 from '../../../assets/images/icons/income.png';
import img2 from '../../../assets/images/icons/expense.png'; */
import img3 from '../../../assets/images/icons/assets.png';
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import img4 from '../../../assets/images/icons/staff.png';

const ContratistaStats = (props) => {
    let history = useHistory();

    const obras = useSelector((store) => store.obras.data);
    const empleados = useSelector((store) => store.empleados.data); 
    return (
        <Row gutter={[16, 16]} className="my-4">

            <Col sm={24} md={12} lg={6} >
                <a href="http://localhost:3000/mantenimientos/obras">
                {/* <Link to={{ pathname: "/mantenimientos/obras" }}> */}
                    <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }}>
                        <span className="lstick widget-card bg-info"></span>
                        {/* <CardBody> */}
                        <div className="d-flex p-4">
                            <div className="mr-3 align-self-center"><img src={img3} alt="assets" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">OBRAS ASIGNADAS</h6>
                                <h2 className="mt-0 ">{obras.length}</h2>
                            </div>
                        </div>
                        {/* </CardBody> */}
                    </Card>
                {/* </Link> */}
                </a>
               

            </Col>
            <Col sm={24} md={12} lg={6} >
                {/* <Link to={{ pathname: "/mantenimento/obras" }}> */}
                    <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }} onClick={()=>  history.push('/mantenimientos/empleado')}>
                        <span className="lstick widget-card bg-info"></span>
                        {/* <CardBody> */}
                        <div className="d-flex p-4">
                            <div className="mr-3 align-self-center"><img src={img4} alt="assets" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">EMPLEADOS REGISTRADOS</h6>
                                <h2 className="mt-0 ">{empleados.length}</h2>
                            </div>
                        </div>
                        {/* </CardBody> */}
                    </Card>
                {/* </Link> */}

            </Col>

        </Row>
    );
}

export default ContratistaStats;
