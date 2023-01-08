import React, { useRef, useState } from "react";
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
import Form from "reactstrap/lib/Form";
import ModalPerfil from "./ModalPerfil";
import { MantenimientosService } from "../../jwt/_services";
import { useEffect } from "react";

const Perfil = (prop) => {
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
  const [JsonData, setJsonData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setAccion] = useState("editar");

  const [obj, setObj] = useState({});
  const [Loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
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
      dataIndex: "descripcion",
      key: "descripcion",
      // render: (val) => checkBox_render(val),
      align: "center",
      ...getColumnSearchProps("descripcion", "N°"),
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
      width: 200,
    },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const actualizarPerfil = (data) => {
    MantenimientosService.actualizarPerfil(data)
      .then(
        (data) => {
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
  };

  useEffect(() => {
    var obj = { estado: ["A", "I"] };
    filtrarPerfil(obj);
  }, [isModalOpen]);


  const filtrarPerfil = (data = {}) => {
    setLoading(true);
    MantenimientosService.filtrarPerfil(data)
      .then(
        (data) => {
          setJsonData(data.text.perfil);
        },
        (error) => {
          notificacion("error", "Error en Litar Perfil ", error);
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };
  const DataSource = JsonData?.map((prop, key) => {
    var obj = {};
    var estado = "";
    switch (prop.estado.trim()) {
      case "A":
        estado = "Activo";
        break;
      case "I":
        estado = "Inactivo";
        break;
      case "E":
        estado = "Eliminado";
        break;
    }
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
              // setObj(obj);
              actualizarPerfil(obj);
              filtrarPerfil();
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
      <ModalPerfil
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
            // scroll={{ x: "calc(300px + 50%)", y: 300 }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Perfil;
