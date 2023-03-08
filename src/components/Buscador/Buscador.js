import React, { useState } from "react";

import { Select, Spin } from "antd";
import { /* useDispatch, */ useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const { Option, OptGroup } = Select;

const Buscador = (props) => {
    let history = useHistory();
    const [value, setValue] = useState();
    const obras = useSelector((store) => store.obras.data);
    const empleados = useSelector((store) => store.empleados.data);
    const contratistas = useSelector((store) => store.contratistas.data);
    const obrasFetching = useSelector((store) => store.obras.isfetching);
    const [data, setData] = useState([]);
    const [dataEmpleados, setDataEmpleados] = useState([]);
    const [dataContratistas, setDataContratistas] = useState([]);

    const handleKeyPress = (event) => {
        console.log(event.target.value);
    };


    const handleSearch = (newValue) => {
        var searchWord = newValue.trim();
        if (searchWord.length > 0) {
            filtrar(searchWord);
        } else {
            setData([]);
            setDataEmpleados([]);
            setDataContratistas([]);
        }
    };

    const handleChange = (event, newValue) => {
        console.log(newValue);
        if (newValue !== undefined && newValue !== " ") {
            setValue(newValue.value);
            var valor = parseInt(newValue.value);
            console.log(valor);
            setValue(newValue.value);
            switch (newValue.name) {
                case "optionTags":
                    history.push("/mantenimientos/obra/" + valor);
                    break;
                case "optionEmpleados":
                    // var item = productos.find((o) => o.id_producto === valor);
                    history.push("/mantenimientos/empleado/" + valor);
                    break;
                case "optionContratistas":
                    history.push("/mantenimientos/contratista/" + valor);
                    break;
            }
        } else {
            setValue();
        }
    };

    const filtrar = (valor) => {
        if (valor.length > 0) {
            const filterTags = obras.filter((value) => {
                return value.nombre_proyecto.toLowerCase().includes(valor.toLowerCase());
            });

            const filterEmpleados = empleados.filter((value) => {
                return value.nombres.toLowerCase().includes(valor.toLowerCase());
            })

            const filterContratistas = contratistas.filter((value) => {
                return value.razon_social.toLowerCase().includes(valor.toLowerCase()) ||
                    value.representante.toLowerCase().includes(valor.toLowerCase());
            })

            setDataContratistas(filterContratistas);

            setDataEmpleados(filterEmpleados);
            setData(filterTags);
        }
    };
    const dataOptions = data.map((d) => (
        <Option key={d.id} name="optionTags">
            <span
                onClick={() => {
                    // var string = `{"palabras_clave":"` + d.nombre + `"}`;
                    history.push("/mantenimientos/obra/" + d.id);
                }}
            >
                {d.nombre_proyecto}
            </span>
        </Option>
    ));

    const dataOptionsEmpleados = dataEmpleados.map((d) => (
        <Option key={d.id} name="optionEmpleados">
            <span
                onClick={() => {
                    // var string = `{"palabras_clave":"` + d.nombre + `"}`;
                    history.push("/mantenimientos/empleado/" + d.id);
                }}
            >
                {d.nombres}
            </span>
        </Option>
    ));

    const dataOptionsContratistas = dataContratistas.map((d) => (
        <Option key={d.id} name="optionContratistas">
            <span
                onClick={() => {
                    // var string = `{"palabras_clave":"` + d.nombre + `"}`;
                    history.push("/mantenimientos/contratista/" + d.id);
                }}
            >
                {d.razon_social}
            </span>
        </Option>
    ));


    return (
        <Select
            showSearch
            allowClear={props.allowClear}
            clearIcon={props.clearIcon}
            suffixIcon={props.suffixIcon}
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            className={props.className}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            onInputKeyDown={handleKeyPress}
            notFoundContent={obrasFetching ? <Spin size="small" /> : null}
        >
            {data.length > 0 && <OptGroup label="Obras">{dataOptions}</OptGroup>}
            {dataEmpleados.length > 0 && <OptGroup label="Empleados">{dataOptionsEmpleados}</OptGroup>}
            {dataContratistas.length > 0 && <OptGroup label="Contratistas">{dataOptionsContratistas}</OptGroup>}
        </Select>
    );
};

export default Buscador;
