import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Tooltip,
} from "antd";
import { EyeOutlined, FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { MantenimientosService } from "../../jwt/_services";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalEmpresa from "./ModalEmpresa";
import { useHistory } from "react-router-dom";

const Empresa = (props) => {
  const searchInput = useRef(null);
  let history = useHistory();
  const sessionstate = useSelector((state) => state.auth);
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
  const [JsonData, setJsonData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setAccion] = useState("editar");

  const [obj, setObj] = useState({});
  const [Loading, setLoading] = useState(false);
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
        return <span className="text-primary">Razón social</span>;
      },
      dataIndex: "razon_social",
      key: "razon_social",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("razon_social", "Razón social"),
    },

    {
      title: () => {
        return <span className="text-primary">Tipo de Contratista</span>;
      },
      dataIndex: "tipoContratista",
      key: "tipoContratista",
      // render: (val) => checkBox_render(val),
      align: "center",
    },
    {
      title: () => {
        return <span className="text-primary">Representante Legal</span>;
      },
      dataIndex: "representante",
      key: "representante",
      // render: (val) => checkBox_render(val),
      align: "center",
    },
    {
      title: () => {
        return <span className="text-primary">Estado Aprobación</span>;
      },
      dataIndex: "estado_aprobacion",
      key: "estado_aprobacion",
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

  const actualizarContratista = (data) => {
    MantenimientosService.actualizarContratista(data)
      .then(
        (data) => {
          notificacion(
            "success",
            "Contratista Actualizado Exitosamente",
            data.text.contratista.razon_social
          );
        },
        (error) => {
          notificacion("error", "Error en Actualizar Contratista ", error);
          console.log(error);
        }
      )
      .finally(() => { });
  };

  const filtrarContratista = useCallback((data = {}) => {
    setLoading(true);
    MantenimientosService.filtrarContratista(data)
      .then(
        (data) => {
          setJsonData(data.text.contratistas);
        },
        (error) => {
          notificacion("error", "Error en Litar Perfil ", error);
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    var obj = { estado: ["A", "I"] };
    filtrarContratista(obj);
  }, [isModalOpen, filtrarContratista]);

  const DataSource = JsonData?.map((prop, key) => {
    // console.log("Informacion");
    // console.log(prop.users.id_perfil);
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
    obj.perfil = prop.users.id_perfil;

    obj.tipoContratista = <span> {"Tipo " + prop.tipo_contratista}</span>
    obj.representante = prop.users.name;
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
              obj.estado = "E";
              obj.acciones = "";
              obj.tipoContratista = "";
              // setObj(obj);
              actualizarContratista(obj);
              filtrarContratista();
            }}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
        <Col>
          <Tooltip title="Ver documentacion">
            <Button type="primary" icon={<EyeOutlined />}
              onClick={() => {
                let obj = DataSource.find((o) => o.key === key + 1);
                var ruta = '/mantenimientos/documentos/' + obj.id;
                history.push(ruta);
              }}
            />
          </Tooltip>
        </Col>
      </Row>
    );
    return { ...prop, ...obj };
  });
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');

  return (
    <Card>
      <ModalEmpresa
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
            <b style={{ fontSize: '20px' }}>EMPRESA CONTRATISTA</b>
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
            // href={Url + 'Reportes/ReporteContratistas'}
            href={"http://localhost:90/api/Reportes/ReporteContratistas/" /* ?id_usuario=" + sessionstate.data_user.id_usuario */}
            className="btn d-flex align-items-center"
            style={{ background: "#6ae695", color: "#fff" }}
          >
            <i className="fa fa-file-excel mr-1" />
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

export default Empresa;
