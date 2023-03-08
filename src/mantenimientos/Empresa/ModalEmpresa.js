import { Button, Form, Input, Modal, notification, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";

const ModalEmpresa = (props) => {
  const [ComboUsuarios, setComboUsuarios] = useState([])
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
        var obj ={...values, id: props.obj.id}
        MantenimientosService.actualizarContratista(obj)
        .then(
          (data) => {
            props.toggle();
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
        .finally(() => {});

    }else {
        MantenimientosService.crearContratista(values)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Contratista Creado Exitosamente ",
              data.text.contratista.razon_social
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Contratista ", error);
            console.log(error);
          }
        )
        .finally(() => {});
    }
 
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const filtrarUsuario = useCallback((data = {}) => {
    // setLoading(true);
    MantenimientosService.filtrarUsuarios(data)
      .then(
        (data) => {
          setComboUsuarios(data.text.usuario);
        },
        (error) => {
          notificacion("error", "Error en Listar Usuario ", error);
          console.log(error);
        }
      )
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    var obj = {id_perfil:2 }
    filtrarUsuario(obj);
  }, [filtrarUsuario]);
  return (
    <Modal
      title={props.Accion === "editar" ? "Editar Empresa" : "Nueva Empresa"}
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
        initialValues={props.obj}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
              min:13,
              message: "el ruc debe tener 13 digitos!",
            },
          ]}
        >
          <Input maxLength={13}/>
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
            options={ComboUsuarios}
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

export default ModalEmpresa;
