import { Button, Col, notification, /* Modal, */ Row, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { EyeOutlined, UploadOutlined, /* DeleteOutlined, */ CloseOutlined, CheckOutlined } from '@ant-design/icons';
import ModalDocumento from './ModalDocumento';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerContratista, setContratistaCargando } from '../../redux/auth/authDucks';
import { useLocation } from 'react-router-dom';
import { MantenimientosService } from '../../jwt/_services';
const Documento = (props) => {
    const auth = useSelector(state => state.auth);
    const contratista = useSelector(state => state.auth.data_user.contratista);
    const loading = useSelector(state => state.auth.isFetchingContratista);
    const dispatch = useDispatch();
    const location = useLocation();
    const [OpenModalDocumento, setOpenModalDocumento] = useState(false);
    const [Data, setData] = useState([]);
    const [Obj, setObj] = useState({});
    const [Accion, setAccion] = useState("");
    const notificacion = (type, mensaje, descripcion) => {
        notification[type]({
            message: mensaje,
            description: descripcion,
        });
    };

    const updateDocumentoContratista = (send) => {
        if (send.id !== undefined) {
            dispatch(setContratistaCargando(true));
            MantenimientosService.updateDocumentoContratista(send)
                .then(
                    (data) => { },
                    (error) => {
                        console.log(error);
                        return false;
                    }
                )
                .finally(() => {
                    dispatch(setContratistaCargando(false));
                    window.location.reload();
                });
        } else {
            notificacion("error", "Error", "No se encontro el documento");
        }
    }

    const columns = [
        {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
            width: 50,
        },
        {
            title: 'Tipo de Documento',
            dataIndex: 'tipoDocumento',
            key: 'tipoDocumento',

        },
        {
            title: 'Estado',
            dataIndex: 'estadoRevision',
            key: 'estadoRevision',
        },
        // {
        //     title: 'Fecha de Ingreso',
        //     dataIndex: 'fechaCreacion',
        //     key: 'fechaCreacion',
        // },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            width: 300,
            align: 'center',
            fixed: 'right',

        }

    ];

    const dataDocmentos = contratista?.tipo_contratista?.tipo_contratista_documento?.map((item, index) => {
        var obj = {}
        var estadoRevision = ""
        var documentoContratista = item.documento_contratista;
        switch (documentoContratista?.estado_revision) {
            case "P":
                estadoRevision = "Pendiente de Subir"
                break;
            case "O":
                estadoRevision = "Pendiente de revisión"
                break;
            case "A":
                estadoRevision = "Aprobado"
                break;
            case "R":
                estadoRevision = "Rechazado"
                break;
            default:
                estadoRevision = "Pendiente"
                break;
        }
        obj.key = index;
        obj.numero = index + 1;
        obj.tipoDocumento = item.tipo_documentos?.nombre;
        obj.estadoRevision = estadoRevision;
        obj.acciones = <Space size="middle">
            <Tooltip title="Subir Documento">
                <Button ghost={true} type="primary" icon={<UploadOutlined />}
                    onClick={() => {
                        let obj = dataDocmentos.find(x => x.key === index);
                        setObj(obj);
                        setAccion("Subir");
                        setOpenModalDocumento(true);
                    }}
                />
            </Tooltip>
            <Tooltip title="Ver documento">
                <Button type="primary" icon={<EyeOutlined />}
                    onClick={() => {
                        let obj = dataDocmentos.find(x => x.key === index);
                        setObj(obj);
                        setAccion("Ver");
                        setOpenModalDocumento(true);
                    }}
                />
            </Tooltip>
            {
                auth.data_user.id_perfil === 1 && (
                    <Tooltip title="Aprobar Documento">
                        <Button danger style={{
                            borderColor: "#52c41a",
                            color: "#52c41a"
                        }} ghost icon={<CheckOutlined />} onClick={() => {
                            var send = {}
                            let obj = dataDocmentos.find(x => x.key === index);
                            console.log(obj);
                            send.id = obj.documento_contratista?.id;
                            send.estado_revision = "A";
                            updateDocumentoContratista(send);
                        }} />
                    </Tooltip>
                )
            }
            {
                // auth.data_user.id_perfil === 1 && (
                <Tooltip title="Eliminar Documento">
                    <Button danger type="primary" icon={<CloseOutlined />} onClick={() => {
                        var send = {}
                        let obj = dataDocmentos.find(x => x.key === index);
                        console.log(obj);
                        send.id = obj.documento_contratista?.id;
                        send.estado_revision = "R";
                        updateDocumentoContratista(send);
                    }} />
                </Tooltip>
                // )
            }
        </Space>
        // obj.fechaCreacion = item.fecha_creacion;

        return { ...item, ...obj }

    })

    useEffect(() => {
        var id_contratista = location.pathname.split("/").pop();
        var data = {
            id_contratista: auth.data_user.id_perfil === 2 ? auth.data_user.contratista.id : id_contratista,
        };

        if (data.id_contratista !== undefined && data.id_contratista !== null) {
            dispatch(obtenerContratista(data))
        }

    }, [location, OpenModalDocumento])

    return (<>
        <ModalDocumento
            open={OpenModalDocumento}
            onCancel={() => { setOpenModalDocumento(false) }}
            obj={Obj}
            accion={Accion}
        />
        <Row gutter={[16, 16]} >
            <Col span={24}>
                <Row justify={'space-between'} className="align-items-center">
                    <Col>
                        <h1>Documentos</h1>
                    </Col>
                    <Col hidden={true}>
                        <Button size='large' type="primary" className='' onClick={() => { setOpenModalDocumento(true) }}>
                            <Row className='align-items-center' gutter={[6, 0]}>
                                <Col className='d-flex'>
                                    <UploadOutlined />
                                </Col>
                                <Col>
                                    Subir Documento
                                </Col>
                            </Row>
                        </Button>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Table loading={loading} columns={columns} dataSource={dataDocmentos} /* onChange={onChange} */ />
            </Col>
        </Row>

    </>);
}

export default Documento;