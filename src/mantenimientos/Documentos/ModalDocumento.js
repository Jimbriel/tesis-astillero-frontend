import React, { useEffect, useState } from "react";
import { Col, Image, Modal, Row } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from 'antd';
import { Url, UrlImage } from "../../jwt/_services/Url.service";
import { useSelector } from "react-redux";
import { MantenimientosService } from "../../jwt/_services";
const { Dragger } = Upload;
const ModalDocumento = (props) => {
    const [File, setFile] = useState({})
    const [Documento, setDocumento] = useState("");
    const contratista = useSelector(state => state.auth.data_user.contratista);

    const VerImagenOPdf = () => {
        console.log(Documento);

        let arr = Documento.length > 0 ? Documento.slice(-3) : '';
        console.log(arr);
        if (arr === 'pdf') {
            return (
                <>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col >
                            <iframe style={{ width: '600px', height: '500px' }} src={UrlImage + Documento + '#zoom=80%'}>
                            </iframe>
                        </Col>
                    </Row>
                </>
            )
        } else if(arr === 'jpg' || arr === 'png' || arr === 'peg') {
            return (
                <>
                    <Image src={UrlImage + Documento}></Image>
                </>
            )
        } else {
            return (
                <span>
                    No hay documento o imagen
                </span>
            )
        }
    }
    const subirDocumento = () => {
        if (File.file) {
            console.log(File);
            console.log(props.obj);
            var send = {
                file: File.file,
                contratista_id: contratista.id,
                tipo_documento_id: props.obj.tipo_documento_id,
            }
            console.log(send);
            if (props.obj.documento_contratista !== null) {
                send.id = props.obj.documento_contratista.id;
                send.estado_revision = "O";
                MantenimientosService.updateDocumentoContratista(send)
                    .then(
                        (data) => { },
                        (error) => {
                            console.log(error);
                            return false;
                        }
                    )
                    .finally(() => {
                        props.onCancel();
                    });
            }else{
                MantenimientosService.subirDocumentoContratista(send)
                    .then(
                        (data) => { },
                        (error) => {
                            console.log(error);
                            return false;
                        }
                    )
                    .finally(() => {
                        props.onCancel();
                    });
            }
        } else {
            props.onCancel();
        }

    }
    const dragerProps = {
        name: 'file',
        // multiple: true,
        action: Url + "uploadimage",
        accept: ".pdf, .jpg, .png, .jpeg",
        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFile({
                    file: info.file,
                    name: info.file.name,
                });
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const onCancel = () => {
        setFile({});
        setDocumento("");
        props.onCancel();
    }

    useEffect(() => {
        console.log(props.obj);
        if (props.obj.documento_contratista) {
            setDocumento(props.obj.documento_contratista.ruta);
        }
    }, [props.obj.documento_contratista])

    return (
        <Modal
            width={props.accion === "Ver" ? 650 : 500}
            open={props.open}
            title={props.accion + " Documento " + props.obj?.tipoDocumento}
            onCancel={onCancel}
            destroyOnClose={true}
            onOk={subirDocumento}
            size="lg"

        >
            {
                props.accion === "Subir" ? (
                    <Dragger {...dragerProps} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click o arrasta el archivo a esta area para subir</p>
                        <p className="ant-upload-hint">
                            Soporte para una carga única.
                        </p>

                    </Dragger>
                ) : (props.accion === "Ver" ? VerImagenOPdf() : <></>)
            }

        </Modal>


    );
}

export default ModalDocumento;