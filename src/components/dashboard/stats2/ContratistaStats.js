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
import img2 from '../../../assets/images/icons/expense.png';

const ContratistaStats = (props) => {
    let history = useHistory();

    const obras = useSelector((store) => store.obras.data);
    const obras_inactivas = useSelector((store) => store.obras.obras_inactivas);
    const empleados = useSelector((store) => store.empleados.data);
    const contratista = useSelector((store) => store.auth.data_user.contratista);
    const contratistas = useSelector((store) => store.contratistas.data);
    const contratistas_aprobados = useSelector((store) => store.contratistas.aprobados);
    const contratistas_pendientes = useSelector((store) => store.contratistas.pendientes);
    const auth = useSelector((store) => store.auth.data_user);
    return (
        <Row gutter={[16, 16]} className="my-4">

            <Col sm={24} md={12} lg={6} >
                {/* <a href="http://localhost:3001/mantenimientos/obras"> */}
                {/* <Link to={{ pathname: "/mantenimientos/obras" }}> */}
                <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }} onClick={() => history.push('/mantenimientos/obras')}>
                    <span className="lstick widget-card bg-info"></span>
                    {/* <CardBody> */}
                    <div className="d-flex pr-5 pt-3 pb-4 pl-4">
                        <div className="mr-3 align-self-center"><img src={img3} alt="assets" /></div>
                        <div className="align-self-center w-100">
                            <h5 className="text-muted text-center mb-0">{"OBRAS " + (auth.id_perfil === 2 ? "ASIGNADAS" : " ")}</h5>
                            <Row className="align-items-center" justify={"space-between"}>
                                <Col >
                                    <span className="text-muted ">{(auth.id_perfil === 2 ? "ASIGNADAS: " : "ACTIVAS: ")}</span>
                                </Col>
                                <Col >
                                    <h2 className="m-0">{obras?.length}</h2>
                                </Col>
                            </Row>
                            <Row className="align-items-center" justify={"space-between"}>
                                <Col>
                                    <span className="text-muted ">{"INACTIVAS O EXPIRADAS: "}</span>
                                </Col>
                                <Col >
                                    <h2 className="m-0 ">{obras_inactivas?.length}</h2>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* </CardBody> */}
                </Card>
                {/* </Link> */}
                {/* </a> */}


            </Col>
            <Col sm={24} md={12} lg={6} >
                {/* <Link to={{ pathname: "/mantenimento/obras" }}> */}
                <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }} onClick={() => history.push('/mantenimientos/empleados')}>
                    <span className="lstick widget-card bg-info"></span>
                    {/* <CardBody> */}
                    <div className="d-flex p-4">
                        <div className="mr-3 align-self-center"><img src={img4} alt="assets" /></div>
                        <div className="align-self-center">
                            <h6 className="text-muted mt-2 mb-0">EMPLEADOS REGISTRADOS</h6>
                            <h2 className="mt-0 ">{empleados?.length}</h2>
                        </div>
                    </div>
                    {/* </CardBody> */}
                </Card>
                {/* </Link> */}

            </Col>

            <Col sm={24} md={12} lg={6} hidden={auth.id_perfil === 1 ? true : false}>
                {/* <Link to={{ pathname: "/mantenimento/obras" }}> */}
                <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }} onClick={() => {
                    var ruta = '/mantenimientos/documentos/' + contratista.id;
                    history.push(ruta);
                }}>
                    <span className="lstick widget-card bg-info"></span>
                    {/* <CardBody> */}
                    <div className="d-flex p-4">
                        <div className="mr-3 align-self-center"><img src={img2} alt="assets" /></div>
                        <div className="align-self-center">
                            <h6 className="text-muted mt-2 mb-0">Documentos</h6>
                        </div>
                    </div>
                    {/* </CardBody> */}
                </Card>
                {/* </Link> */}

            </Col>

            <Col sm={24} md={12} lg={6} hidden={auth.id_perfil === 1 ? false : true}>
                {/* <Link to={{ pathname: "/mantenimento/obras" }}> */}
                <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ cursor: "pointer" }} onClick={() => history.push('/mantenimientos/empresas')}>
                    <span className="lstick widget-card bg-info"></span>
                    {/* <CardBody> */}
                    <div className="d-flex pr-5 pt-3 pb-4 pl-4">
                        <div className="mr-3 align-self-center"><img src={img4} alt="assets" /></div>
                        <div className="align-self-center w-100">
                            <h5 className="text-muted text-center mb-0">{"Contratistas"}</h5>
                            <Row className="align-items-center" justify={"space-between"}>
                                <Col >
                                    <span className="text-muted ">{("APROBADOS: ")}</span>
                                </Col>
                                <Col >
                                    <h2 className="m-0">{contratistas_aprobados?.length}</h2>
                                </Col>
                            </Row>
                            <Row className="align-items-center" justify={"space-between"}>
                                <Col>
                                    <span className="text-muted ">{"PENDIENTES: "}</span>
                                </Col>
                                <Col >
                                    <h2 className="m-0 ">{contratistas_pendientes?.length}</h2>
                                </Col>
                            </Row>
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
