import { Button, Form, Input, Modal, notification, Row, Select } from "antd";
import React, {
  useCallback,
  useEffect,
  useState /* , { useState } */,
} from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";

const ModalEmpleado = (props) => {
  const [ComboUsuarios, setComboUsuarios] = useState([]);
  const [form] = Form.useForm();
  const [ComboContratista, setComboContratista] = useState([]);
  const obras = useSelector((store) => store.obras.data);
  // const dispatch = useDispatch();
  // const [ Error, setError] = useState(true)
  // const [Descripcion, setDescripcion] = useState("")
  // const [Justify, setJustify] = useState("end")
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
    if (props.Accion === "editar") {
      var obj = { ...values, id: props.obj.id };
      MantenimientosService.actualizarEmpleado(obj)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Empleado Actualizado Exitosamente ",
              data.text.empleado.nombre
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Empleado ", error);
            console.log(error);
          }
        )
        .finally(() => {});
    } else {
      MantenimientosService.crearEmpleado(values)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Empleado Creado Exitosamente ",
              data.text.empleado.nombre
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Empleado ", error);
            console.log(error);
          }
        )
        .finally(() => {});
    }
  };

  // useEffect(() => {
  //  Descripcion.length > 0 ? setError(true) : setError(false)
  // }, [Descripcion, Error])

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const fail = () => {
  //   if(Descripcion.length === 0){
  //     Error === true ? setJustify("end"): setJustify("start");

  //   }
  //   setError(!Error);
  // };

  const onChange = (e) => {
    var obj = ComboUsuarios.find((o) => o.id === e);
    console.log(obj);
    if (obj !== undefined) {
      form.setFieldsValue({
        correo: obj.email,
        nombres: obj.name,
      });
    }
  };

  const onChangeObra = (e) => {
    var obj = obras.find((o) => o.id === e);
    if (obj !== undefined) {
      form.setFieldsValue({
        contratista_id: obj.contratista_id,
      });
    }
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
    var obj = { id_perfil: 3 };
    filtrarUsuario(obj);
  }, [filtrarUsuario]);

  const filtrarContratista = useCallback((data = {}) => {
    // setLoading(true);
    MantenimientosService.filtrarContratista(data)
      .then(
        (data) => {
          setComboContratista(data.text.contratistas);
        },
        (error) => {
          notificacion("error", "Error en Listar Contratista ", error);
          console.log(error);
        }
      )
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    filtrarContratista();
  }, [filtrarContratista]);

  const cancel = () => {
    form.resetFields();
    props.toggle();
  };

  useEffect(() => {
    if (props.Accion === "editar") {
      form.setFieldsValue({
        ...props.obj,
      });
    } else {
      form.resetFields();
    }
  }, [props.Accion, props.obj, form]);

  return (
    <Modal
      title={props.Accion === "editar" ? "Editar Empleado" : "Nuevo Empleado"}
      open={props.isModalOpen}
      footer={null}
      //   onOk={handleOk}
      closable={true}
      maskClosable={true}
      onCancel={cancel}
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
        // initialValues={{
        //   ...props.obj
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        {/* <Form.Item
          name="user_id"
          label="Usuario"
          // rules={[
          //   {
          //     required: true,
          //     message: "Por favor seleccione un Represente!",
          //   },
          // ]}
        >
          <Select
            options={ComboUsuarios}
            onChange={onChange}
            placeholder="Seleccionar Usuario"
          ></Select>
        </Form.Item> */}
        <Form.Item
          label="Cedula"
          name="cedula"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Por favor ingrese una cedula!",
            },
            {
              min: 10,
              message: "la cedula debe tener al menos 10 digitos!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="nombres"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un nombre!",
            },
          ]}
          // onChange = {(e) => setDescripcion(e.target.value) }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellidos"
          name="apellidos"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un apellido!",
            },
          ]}
          // onChange = {(e) => setDescripcion(e.target.value) }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo"
          name="correo"
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
            // ({ getFieldValue }) => ({
            //   validator(_, value) {
            //     VerificarCorreo(value);
            //     if (!ValidarCorreo) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(new Error("Correo ya existe"));
            //   },
            // }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="obra_id"
          label="Obra"
          rules={[
            {
              required: true,
              message: "Por favor seleccione Obra!",
            },
          ]}
        >
          <Select
            options={obras}
            placeholder="Seleccionar Obra"
            onChange={onChangeObra}
          ></Select>
        </Form.Item>
        <Form.Item
          name="contratista_id"
          label="Empresa"
          rules={[
            {
              required: true,
              message: "Por favor seleccione Empresa!",
            },
          ]}
        >
          <Select
            options={ComboContratista}
            placeholder="Seleccionar Empresa"
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
        <Row justify={"end"}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit" /*  onMouseEnter={()=> fail() } */ /* onMouseLeave={()=>fail()} */
            >
              Guardar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalEmpleado;
