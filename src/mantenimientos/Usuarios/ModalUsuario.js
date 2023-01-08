import { Button, Form, Input, Modal, notification, Row, Select } from "antd";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";

const ModalUsuario = (props) => {
    const [ComboPerfil, setComboPerfil] = useState([])
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
    var obj ={...values, id: props.obj.id}
    console.log("Success:", obj);
    if(props.Accion === "editar" ){
        MantenimientosService.actualizarUsuario(obj)
        .then(
          (data) => {
            console.log(data);
            props.toggle();
            notificacion(
              "success",
              "Usuario Actualizado Exitosamente ",
              data.text?.usuario?.name
            );
          },
          (error) => {
            notificacion("error", "Error en Editar Usuario ", error);
            console.log(error);
          }
        )
        .finally(() => {});

    }/* else { */
    //     MantenimientosService.crearPerfil(values)
    //     .then(
    //       (data) => {
    //         props.toggle();
    //         notificacion(
    //           "success",
    //           "Perfil Creado Exitosamente ",
    //           data.text.perfil.descripcion
    //         );
    //       },
    //       (error) => {
    //         notificacion("error", "Error en Crear Perfil ", error);
    //         console.log(error);
    //       }
    //     )
    //     .finally(() => {});
    // }
 
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const filtrarPerfil = useCallback((data = {}) => {
    // setLoading(true);
    MantenimientosService.filtrarPerfil(data)
      .then(
        (data) => {
            console.log(data.text);
          setComboPerfil(data.text.perfil);
        },
        (error) => {
          notificacion("error", "Error en Litar Perfil ", error);
          console.log(error);
        }
      )
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    filtrarPerfil();
  }, [filtrarPerfil]);
  return (
    <Modal
      title={props.Accion === "editar" ? "Editar Usuario" : "Nuevo Usuario"}
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
          name: props.obj?.name,
          estado: props.obj?.estado?.trim(),
          email: props.obj?.email,
          id_perfil: props.obj?.id_perfil,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un nombre!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Correo"
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un correo!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="id_perfil" label="Perfil"
          rules={[
            {
              required: true,
              message: "Por favor seleccione un perfil!",
            },
          ]}
        >
            <Select options={ComboPerfil} placeholder="Seleccionar Perfil">
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

export default ModalUsuario;
