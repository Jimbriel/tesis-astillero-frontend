import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  DatePicker,
} from "antd";
// import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useState /*  useRef, useState  */,
} from "react";
import { MantenimientosService } from "../../jwt/_services/Mantenimientos.service";
const { RangePicker } = DatePicker;
const { Option } = Select;
const ModalObras = (props) => {
  const [ComboContratista, setComboContratista] = useState([]);
  const [ContratistasEliminados, setContratistasEliminados] = useState([])
  const [ContratistasAgregados, setContratistasAgregados] = useState([])

  const [contratistas, setContratistas] = useState([
    props.Accion === "editar" ? props.obj.contratistas : []
  ]);
  const [selectedOptions, setSelectedOptions] = useState(contratistas);
  // const [InitialValues, setInitialValues] = useState({});
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
    // if (ContratistasEliminados.length > 0) {
    //   values.contratistas_eliminados = ContratistasEliminados;
    // }
    // if (contratistas.length > 0) {
    //   values.contratistas_agregados = contratistas;
    // }
    console.log("Success:", values);
    // return false;
    if (props.Accion === "editar") {
      var obj = { ...values, id: props.obj.id };
      MantenimientosService.actualizarObra(obj)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Obra Actualizada Exitosamente ",
              data.text.obra.nombre_proyecto
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Obra ", error);
            console.log(error);
          }
        )
        .finally(() => { });
    } else {
      MantenimientosService.crearObra(values)
        .then(
          (data) => {
            props.toggle();
            notificacion(
              "success",
              "Obra Creada Exitosamente ",
              data.text.obra.nombre_proyecto
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Obra ", error);
            console.log(error);
          }
        )
        .finally(() => { });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

//   const handleSelectChange = (value, changedValues) => {
//     if (props.Accion === "editar") {
//       const removedOptions = selectedOptions.filter(option => !value.includes(option));
//       const contratistaseliminados = props.obj.contratistas.filter(option => !value.includes(option));
//       if(contratistaseliminados.length > 0){
//         setContratistasEliminados(...ContratistasEliminados, contratistaseliminados)
//       }

//       console.log('Opciones eliminadas:', contratistaseliminados);
  
//       const addedOptions = value.filter(option => !selectedOptions.includes(option));
//       console.log('Nuevas opciones:', addedOptions);

//       // if (addedOptions.length > 0) {
//       //   setContratistasAgregados(...ContratistasAgregados, addedOptions)
//       // }
  
//       setSelectedOptions(value);
//       setContratistas(value);
//     }
    
// };

  // const handleSelectChange = (value, changedValues) => {
  //   if (props.Accion === "editar") {
  //     if (props.obj.contratistas?.length > 0) {
  //       const removedOptions = props.obj.contratistas.filter(option => !value.includes(option.value));
  //       if (removedOptions.length > 0) {
  //         setContratistasEliminados(removedOptions)
  //       }
  //       console.log('Opciones eliminadas:', removedOptions);
  //     }

  //     const addedOptions = ComboContratista.filter(option => value.includes(option.value));
  //     if (addedOptions.length > 0) {
  //       setContratistasAgregados(addedOptions)
  //     }
  //     console.log('Opciones nuevas:', addedOptions);
  //   }

  //   // const removedOptions = ComboContratista.map (option => 

  //   //   value.includes(option.value) ? option : null

  //   //   );

  // }

  useEffect(() => {
    filtrarContratista();
  }, [filtrarContratista]);

  // useEffect(() => {
  //   // props.isModalOpen === true /* && props.actividad !== undefined   */ &&
  //   if(props.isModalOpen === true){
  //     // var jornada = props.obj?.jornadas.filter(jornada => jornada !== false)
  //     console.log(props.obj.periodos);
  //       setInitialValues({
  //         ...props.obj,
  //         actividades: props.obj.actividad,
  //         jornada: props.obj.jornadas,
  //         periodo: props.obj.periodos,

  //       });
  //   }

  // }, [props.isModalOpen]);

  return (
    <Modal
      title={props.Accion === "editar" ? "Editar Obra" : "Nueva Obra"}
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
          ...props.obj,
          actividades: props.obj.actividad,
          jornada: props.obj.jornadas,
          periodo: props.obj.periodos,
          lugar: props.obj.lugares

        }}
        // initialValues={InitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del Proyecto"
          name="nombre_proyecto"
          validateTrigger={"onBlur"}
          rules={[
            {
              required: true,
              message: "Por favor ingrese un Nombre!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contratistas"
          label="Empresa"
          rules={[
            {
              required: true,
              message: "Por favor seleccione Empresa!",
            },
          ]}
        >
          <Select
            mode="multiple"
            options={ComboContratista}
            // onChange={handleSelectChange}
            placeholder="Seleccionar Empresa"
          ></Select>
        </Form.Item>
        <Form.Item name="actividades" label="Actividades">
          <Select mode="multiple" placeholder="Actividades a realizar">
            <Option value="soldadura">soldadura</Option>
            <Option value="izaje">izaje</Option>
            <Option value="esmerilado">esmerilado</Option>
            <Option value="hidroblasting">hidroblasting</Option>
            <Option value="altura">altura</Option>
            <Option value="confinado">confinado</Option>
            <Option value="inmersion">inmersion</Option>
            <Option value="granallado">granallado</Option>
            <Option value="pintura">pintura</Option>
          </Select>
        </Form.Item>
        <Form.Item name="jornada" label="Jornada">
          <Select mode="multiple" placeholder="Jornada de trabajo">
            <Option value="matutino">matutino</Option>
            <Option value="vespertino">vespertino</Option>
            <Option value="nocturno">nocturno</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Lugar de Trabajo" name="lugar">
          <Select mode="multiple" placeholder="Jornada de trabajo">
            <Option value="puerto">puerto</Option>
            <Option value="dique">dique</Option>
            <Option value="taller1">taller de carpinteria</Option>
            <Option value="taller2">taller de soldadurta</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Duracion del Proyecto" name="periodo" rules={[
          {
            required: true,
            message: "Por favor seleccione periodo de trabajo",
          },
        ]}>
          <RangePicker
            // allowClear
            style={{ width: "100%" }}
            placeholder={["Fecha desde:", "Fecha hasta:"]}
            format="YYYY/MM/DD"
            onChange={(x) => {
              console.log(x);
            }}
          />
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
