import { Button, Form, Input, Modal, notification, Row, Select } from "antd";
import React, {/*  useRef, useState  */} from "react";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";

const ModalObras = (props) => {
  // const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  const notificacion = (type, mensaje, descripcion) => {
    notification[type]({
      message: mensaje,
      description: descripcion,
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    if(props.Accion === "editar" ){
        var obj ={...values, id_perfil: props.obj.id_perfil}
        MantenimientosService.actualizarPerfil(obj)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Perfil Actualizado Exitosamente ",
              data.text.perfil.descripcion
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Perfil ", error);
            console.log(error);
          }
        )
        .finally(() => {});

    }else {
        MantenimientosService.crearPerfil(values)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Perfil Creado Exitosamente ",
              data.text.perfil.descripcion
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Perfil ", error);
            console.log(error);
          }
        )
        .finally(() => {});
    }
 
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={props.Accion === "editar" ? "Editar Perfil" : "Nuevo Perfil"}
      open={props.isModalOpen}
      footer={null}
      //   onOk={handleOk}
      closable={true}
      maskClosable={true}
      onCancel={props.toggle}
      blur={true}
      destroyOnClose={true}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          descripcion: props.obj?.descripcion,
          estado: props.obj?.estado?.trim(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un perfil!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {props.Accion === "editar" ? (
          <Form.Item name="estado" label="Estado">
            <Select>
              <Select.Option value="A">Activo</Select.Option>
              <Select.Option value="I">Inactivo</Select.Option>
            </Select>
          </Form.Item>
        ) : null}
        <Row justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalObras;
