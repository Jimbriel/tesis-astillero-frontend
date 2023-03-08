import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Card,
    CardBody
} from 'reactstrap';
import { MantenimientosService } from "../../../jwt/_services";

const Feeds = () => {
    const auth = useSelector(state => state.auth);
    let history = useHistory();
    const [feeds, SetFeeds] = useState([])
    const fechaActual = Date.now();

    const DataFeeds = feeds.map((feed, index) => {
        var type = ""
        var className = ""
        var icon = ""

        var fechaDeRegistro = Date.parse(feed.created_at)
        var diferencia = fechaActual - fechaDeRegistro
        var minutosTranscurridos = Math.floor(diferencia / 60000);
        var horasTranscurridas = Math.floor(diferencia / 3600000);
        var diasTranscurridos = Math.floor(diferencia / 86400000);
        let fechaMostrada;

        if (minutosTranscurridos < 1) {
            fechaMostrada = "justo ahora";
        } else if (minutosTranscurridos < 60) {
            fechaMostrada = `hace ${minutosTranscurridos} minutos`;
        } else if (horasTranscurridas < 24) {
            fechaMostrada = `hace ${horasTranscurridas} horas`;
        } else {
            fechaMostrada = `el ${new Date(fechaDeRegistro).toLocaleDateString()}`;
        }

        console.log(fechaMostrada)


        switch (feed.type) {
            case "contratista":
                className = "feed-icon bg-light-danger"
                icon = "ti-user"
                break;

            case "documento":

                className = "feed-icon bg-light-success"
                icon = "ti-folder"

                break;

            case "usuario":
                className = "feed-icon bg-light-danger"
                icon = "ti-user"
                break;

            case "obra":
                className = "feed-icon bg-light-info"
                icon = "far fa-bell"

            default:
                className = "feed-icon bg-light-info"
                icon = "far fa-bell"
                break;
        }
        return (
            <li key={index} className="feed-item" onClick={
                () => {
                    history.push(feed.url);
                }
            }>
                <div className={className}><i className={icon}></i></div> {feed.description} <span className="ml-auto font-12 text-muted">{fechaMostrada}</span>
            </li>

        )
    })

    const getFeeds = () => {
        MantenimientosService.listarFeeds()
            .then(
                (data) => {
                    SetFeeds(data.text.feeds)
                }

            )
            .finally(() => { })
    }

    useEffect(() => {
        if (auth.data_user.id_perfil === 1) {

            getFeeds()
        }

    }, [])

    return (
        <Card>
            <span className="lstick"></span>
            <CardBody>
                <h4 className="card-title">Feeds</h4>
                <div className="feed-widget">
                    <ul className="list-style-none feed-body m-0 pb-3">
                        {DataFeeds}
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}

export default Feeds;
