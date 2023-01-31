import React, { /* useCallback, */ useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  // Modal,
  notification,
  Row,
  Space,
  Table,
} from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { MantenimientosService } from "../../jwt/_services";
import ModalObras from "./ModalObras";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { aggObras } from "../../redux/obras/ObrasDucks";

const Obras = (props) => {
  const dispatch = useDispatch();
  const obras = useSelector((store) => store.obras.data);
  const obrasFetching = useSelector((store) => store.obras.isfetching);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const notificacion = (type, mensaje, descripcion) => {
    notification[type]({
      message: mensaje,
      description: descripcion,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, name = "") => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<FilterOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Limpiar
          </Button>
          {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });
  // const [JsonData, setJsonData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setAccion] = useState("editar");

  const [obj, setObj] = useState({});
  // const [Loading, setLoading] = useState(false);
  const columns = [
    {
      title: () => {
        return <span className="text-primary">N°</span>;
      },
      dataIndex: "key",
      key: "key",
      // fixed: "left",
      align: "center",
      sorter: (a, b) => a.key - b.key,
      width: 100,
    },

    {
      title: () => {
        return <span className="text-primary">Proyecto</span>;
      },
      dataIndex: "nombre_proyecto",
      key: "nombre_proyecto",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("nombre_proyecto", "Proyecto"),
    },
    {
      title: () => {
        return <span className="text-primary">Ubicación</span>;
      },
      dataIndex: "lugar",
      key: "lugar",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("lugar", "Ubicación"),
    },
    {
      title: () => {
        return <span className="text-primary">Actividades</span>;
      },
      dataIndex: "actividades",
      key: "actividades",
      // render: (val) => checkBox_render(val),
      align: "center",
    },
    {
      title: () => {
        return <span className="text-primary">Horarios</span>;
      },
      dataIndex: "jornada",
      key: "jornada",
      // render: (val) => checkBox_render(val),
      align: "center",
    },
    {
      title: () => {
        return <span className="text-primary">Periodo</span>;
      },
      dataIndex: "periodo",
      key: "periodo",
      // render: (val) => checkBox_render(val),
      align: "center",
    },
    {
      title: () => {
        return <span className="text-primary">Estado</span>;
      },
      dataIndex: "estado_text",
      key: "estado_text",
      filters: [
        {
          text: "Activo",
          value: "Activo",
        },
        {
          text: "Inactivo",
          value: "Inactivo",
        },
      ],
      onFilter: (value, record) => record.estado_text.startsWith(value),
      // filterSearch: true,
      // render: (val) => checkBox_render(val),
      align: "center",
      width: 200,
    },
    {
      title: () => {
        return <span className="text-primary">Acciones</span>;
      },
      dataIndex: "acciones",
      key: "acciones",
      // render: (val) => checkBox_render(val),
      align: "center",
      fixed: "right",
      width: 200,
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const actualizarObra = (data) => {
    MantenimientosService.actualizarObra(data)
        .then(
          (data) => {
            notificacion(
              "success",
              "Obra Actualizada Exitosamente ",
              // data.text.obra.nombre_proyecto
            );
          },
          (error) => {
            notificacion("error", "Error en Crear Obra ", error);
            console.log(error);
          }
        )
        .finally(() => {});
  };

  // const filtrarObras = useCallback((data = {}) => {
  //   // setLoading(true);
  //   MantenimientosService.filtrarObras(data)
  //     .then(
  //       (data) => {
  //         // setJsonData(data.text.obra);
  //       },
  //       (error) => {
  //         notificacion("error", "Error en Litar Obras ", error);
  //         console.log(error);
  //       }
  //     )
  //     .finally(() => {
  //       // setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    var obj = { estado: ["A", "I"] };
    dispatch(aggObras(obj));
    // filtrarObras(obj);
  }, [isModalOpen, dispatch]);

  const DataSource = obras?.map((prop, key) => {
    var obj = {};
    var estado = "";
    switch (prop.estado?.trim()) {
      case "A":
        estado = "Activo";
        break;
      case "I":
        estado = "Inactivo";
        break;
      case "E":
        estado = "Eliminado";
        break;
      default:
        estado = "";
    }
    obj.jornada = (
      <div>
        {prop.matutino === "T" && <div>{"matutino "}</div>}
        {prop.vespertino === "T" && <div>{"vespertino "}</div>}
        {prop.nocturno === "T" && <div>{"nocturno "}</div>}
      </div>
    );
    prop.periodo = <div>{prop.fecha_inicio + " / " + prop.fecha_fin}</div>;
    var jornadas = [
      prop.matutino === "T" && "matutino",
      prop.vespertino === "T" && "vespertino",
      prop.nocturno === "T" && "nocturno",
    ];
    obj.jornadas =
      jornadas.length > 0 && jornadas.filter((jornada) => jornada !== false);
    var periodo =[moment(prop?.fecha_inicio), moment(prop?.fecha_fin)];
    obj.periodos= periodo
    obj.actividad = prop.actividades?.split(",");
    obj.estado_text = estado;
    obj.key = key + 1;
    obj.acciones = (
      <Row justify="center" gutter={[8, 8]}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              let obj = DataSource.find((o) => o.key === key + 1);
              setObj(obj);
              setAccion("editar");
              showModal();
            }}
          >
            <i className="fa fa-edit" />
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            danger
            onClick={() => {
              let obj = DataSource.find((o) => o.key === key + 1);
              let data = {id: obj.id, estado: "E"}
              // setObj(obj);
              actualizarObra(data);
              dispatch(aggObras({ estado: ["A", "I"] }));
            }}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      </Row>
    );
    return { ...prop, ...obj };
  });
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');

  return (
    <Card>
      <ModalObras
        Accion={titulo}
        isModalOpen={isModalOpen}
        obj={obj}
        toggle={() => closeModal()}
      />

      <Row gutter={[16, 16]}>
        <Col>
          <Button
            type="primary"
            className="d-flex align-items-center"
            icon={<PlusCircleOutlined />}
            size="large"
            // loading={loadings[1]}
            // onClick={() => enterLoading(1)}
            onClick={() => {
              setObj({});
              setAccion("nuevo");
              showModal();
            }}
          >
            <span style={{ fontSize: "21px" }}>Nuevo</span>
          </Button>
        </Col>
        <Col span={24}>
          <Table
            loading={obrasFetching}
            locale={{
              emptyText: "Sin datos para mostrar",
            }}
            className="OrdenHeader OrdenAll"
            rowClassName="OrdenRows"
            columns={columns}
            dataSource={DataSource}
            size="middle"
            pagination={{
              position: ["none", "bottomCenter"],
              pageSize: 100,
              hideOnSinglePage: true,
            }}
            showSizeChanger={false}
            scroll={{ x: 1200 /*  y: 300 */ }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Obras;
