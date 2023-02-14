import React, { /* useCallback, */ useRef, useState } from "react";
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
import ModalEmpleado from "./ModalEmpleado";
import { MantenimientosService } from "../../jwt/_services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aggEmpleados } from "../../redux/empleado/EmpleadosDucks";

const Empleado = (props) => {
  const dispatch = useDispatch();
  const sessionstate = useSelector((state) => state.auth);

  const empleados = useSelector((store) => store.empleados.data);
  const Loading = useSelector((store) => store.empleados.isfetching);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setAccion] = useState("editar");

  const [obj, setObj] = useState({});
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
        return <span className="text-primary">Nombre</span>;
      },
      dataIndex: "label",
      key: "label",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("label", "Nombre"),
    },
    {
      title: () => {
        return <span className="text-primary">Correo</span>;
      },
      dataIndex: "correo",
      key: "correo",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("correo", "Correo"),
    },
    {
      title: () => {
        return <span className="text-primary">Empresa</span>;
      },
      dataIndex: "empresa",
      key: "empresa",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("empresa", "Correo"),
    },
    {
      title: () => {
        return <span className="text-primary">Obra</span>;
      },
      dataIndex: "obra",
      key: "obra",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("obra", "Correo"),
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
      dataIndex: sessionstate.data_user.id_perfil === 1 ? "acciones" : "",
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

  const actualizarEmpleado = (data) => {
    MantenimientosService.actualizarEmpleado(data)
    .then(
      (data) => {
        // props.toggle();
        console.log(data);
        notificacion(
          "success",
          "Empleado Actualizado Exitosamente ",
          // data.text.empleado?.nombre
        );
      },
      (error) => {
        notificacion("error", "Error en Actualizar Empleado ", error);
        console.log(error);
      }
    )
    .finally(() => {});
  };



  useEffect(() => {
    var obj = { estado: ["A", "I"] };
    dispatch(aggEmpleados(obj));
    // filtrarObras(obj);
  }, [isModalOpen, dispatch]);

  const DataSource = empleados?.map((prop, key) => {
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
    obj.estado_text = estado;
    obj.obra = prop.empleado_obra?.obra?.nombre_proyecto;
    obj.obra_id= prop.empleado_obra?.obra?.id;
    obj.empresa = prop.contratista?.razon_social
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
              console.log(obj);
              // setObj(obj);
              actualizarEmpleado(data);
              dispatch(aggEmpleados({estado: ['A', 'I']}));

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
      <ModalEmpleado
        Accion={titulo}
        isModalOpen={isModalOpen}
        obj={obj}
        toggle={() => closeModal()}
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20'
                }}
                >
                <b style={{fontSize: '20px'}}>EMPLEADOS</b>
            </div>
        </Col>
      </Row>

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
        <Col span={18}>
        </Col>
        <Col>
              <a
                // href={Url + 'Reportes/ReporteObra'}
                href={"http://localhost:82/api/Reportes/ReporteEmpleados?id_usuario=" + sessionstate.data_user.id_usuario}
                className="btn d-flex align-items-center"
                style={{background:"#6ae695", color: "#fff"}}
              >
                <i className="fa fa-file-excel mr-1"/>
                REPORTE EXCEL
              </a>
        </Col>
        <Col span={24}>
          <Table
            loading={Loading}
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

export default Empleado;
