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
} from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { MantenimientosService } from "../jwt/_services";

const ReporteContratistas = (props) => {
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
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
  ];


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
    obj.tipoContratista =<span> {"Tipo " + prop.tipo_contratista}</span>
    obj.representante = prop.users.name;
    obj.estado_text = estado;
    obj.key = key + 1;
    console.log(obj)
    return { ...prop, ...obj };
  });
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');

  return (
    <Card>
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
                <b style={{fontSize: '20px'}}>REPORTE CONTRATISTAS</b>
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
            scroll={{ x: 1200 /*  y: 300 */ }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ReporteContratistas;
