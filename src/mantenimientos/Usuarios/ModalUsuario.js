import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Row, Select } from "antd";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { AuthenticationService } from "../../jwt/_services";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";

const ModalUsuario = (props) => {
  const [ComboPerfil, setComboPerfil] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Password, setPassword] = useState("");
  // const [Values, setValues] = useState([]);
  const [ValidarCorreo, setValidarCorreo] = useState(false);
  // const [form] = Form.useForm();
  // const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  // const initialValues = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  //   estado: undefined,
  //   perfil: undefined,
  // };

  // if (props.Accion === "editar"){

  //   form.setFieldsValue(initialValues);
  // }else{
  //   form.setFieldsValue(props.obj);

  // }
  const notificacion = (type, mensaje, descripcion) => {
    notification[type]({
      message: mensaje,
      description: descripcion,
    });
  };
  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    if (props.Accion === "editar") {
      var obj = { ...values, id: props.obj.id };
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
        .finally(() => {
          setLoading(false);
        });
    } else {
      MantenimientosService.crearUsuario(values)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Usuario Creado Exitosamente ",
              data.text.usuario?.name
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Perfil ", error);
            console.log(error);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
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

  const VerificarCorreo = (data) => {
    setLoading(true);
    // var data = form.getFieldValue("email");
    console.log(data);
    if (data /* && props.Accion === "editar" */) {
      AuthenticationService.verificarCorreo({ correo: data })
        .then(
          (data) => {
            console.log(data.text);
            setValidarCorreo(data.text.usuario);
            // setComboPerfil(data.text.perfil);
          },
          (error) => {
            notificacion("error", "Error en Litar Perfil ", error);
            console.log(error);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      setValidarCorreo(false);
    }
  };

  const handleCancel = () => {
    props.toggle();
    setValidarCorreo(false);
  };

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
      onCancel={() => handleCancel()}
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
        // form={form}
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
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
              message: "Por favor ingrese un correo valido",
            },
            {
              required: true,
              message: "Por favor ingrese un correo!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                VerificarCorreo(value);
                if (!ValidarCorreo) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Correo ya existe"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          validateTrigger="onBlur"
          rules={[
            {
              min: 8,
              message: "La contraseña debe tener más de 7 caracteres",
            },
            {
              required: true,
              message: "Por favor ingrese una Contraseña!",
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={(x) => setPassword(x.target.value)} />
        </Form.Item>
        {Password.length > 0 && (
          <Form.Item
            name="confirm"
            label="Confirmar Contraseña"
            dependencies={["password"]}
            validateTrigger="onBlur"
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas  no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          name="id_perfil"
          label="Perfil"
          rules={[
            {
              required: true,
              message: "Por favor seleccione un perfil!",
            },
          ]}
        >
          <Select
            options={ComboPerfil}
            placeholder="Seleccionar Perfil"
          ></Select>
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
            <Button
              disabled={Loading}
              loading={Loading}
              icon={<SaveOutlined />}
              type="primary"
              htmlType="submit"
            >
              Guardar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalUsuario;
