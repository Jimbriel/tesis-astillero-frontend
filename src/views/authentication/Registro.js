import React, { useEffect } from "react";
import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import { MantenimientosService } from "../../jwt/_services";
import { useHistory } from "react-router-dom";
import img2 from '../../assets/images/background/login-register.jpg';

const sidebarBackground = {
    backgroundImage: "url(" + img2 + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center"
};

const Registro = (props) => {
    let history = useHistory();
    const notificacion = (type, mensaje, descripcion) => {
        notification[type]({
            message: mensaje,
            description: descripcion,
        });
    };
    const onFinish = (values) => {
        MantenimientosService.actualizarContratista(values)
            .then(
                (data) => {
                    notificacion(
                        "success",
                        "Contratista Actualizado Exitosamente ",
                        data.text.contratista.razon_social
                    );
                },
                (error) => {
                    notificacion("error", "Error en Actualizar Contratista ", error);
                    console.log(error);
                }
            )
            .finally(() => {
                history.push("/");
            });


    };

    useEffect(() => {
        if (props.match.params.codigo !== null && props.match.params.codigo !== undefined && props.match.params.id !== ":codigo") {
            // console.log(props.match.params.id);
            const obj = {
                codigo: props.match.params.codigo
            }
            console.log(obj)
            // LandingService.validarCoidigoRegistro(obj)
            //     .then((data) => {
            //         // console.log(data)
            //         if (data.text.msg === 'ok') {
            //             //cambiar estado para mostrar fomulario
            //             setComponenteRegistro(true);
            //         }
            //     },
            //         (error) => {
            //             // console.log(error)
            //             var respuesta = { ok: false, message: error.mensaje, ruta: '/' };
            //             if(error.data){
            //                 setStade(true)
            //             }
            //             Mensaje(respuesta);
            //             return false;
            //         }
            //     )
            //     .finally(() => {

            //     });
        }
    }, [props])
    
    return (
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
            <Row className="bg-white p-5" style={{ borderRadius: "25px" }} gutter={[16, 16]}>
                <Col span={24} className="text-center">
                    <h3>Formulario de Registro Contratista</h3>

                </Col>
                <Col span={24}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        // initialValues={props.obj}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Ruc"
                            name="ruc"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese un ruc!",
                                },
                                {
                                    min: 13,
                                    message: "el ruc debe tener 13 digitos!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Razon Social"
                            name="razon_social"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese razon social!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="user_id"
                            label="Representante"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor seleccione un Represente!",
                                },
                            ]}
                        >
                            <Select
                                // options={ComboUsuarios}
                                placeholder="Seleccionar Representante"
                            ></Select>
                        </Form.Item>
                        <Form.Item name="tipo_contratista" label="Tipo Contratista">
                            <Select placeholder="Seleccione un tipo de contratista">
                                <Select.Option value="1">Tipo 1</Select.Option>
                                <Select.Option value="2">Tipo 2</Select.Option>
                                <Select.Option value="3">Tipo 3</Select.Option>
                                <Select.Option value="4">Tipo 4</Select.Option>
                            </Select>
                        </Form.Item>
                        <Row justify="center">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Guardar
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>

            </Row>

        </div>
    );
}

export default Registro;