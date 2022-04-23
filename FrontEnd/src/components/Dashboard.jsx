import React from "react";
import "../Assets/css/Dashboard.style.css";
import Histogram from "./Charts/Histogram";
import PieType from "./Charts/PieType";
import PiePriority from "./Charts/PiePriority";
import HistogramStatus from "./Charts/H_Histogram";
import HistogramPriority from "./Charts/HistogramPriority";
import Tables from "./table/Tables";
import Header from "./table/Header";
import ScatterTime from "./Charts/ScatterTime";
import HistogramNbresTickets from "./Charts/HistogramNbresTickets";
import { Spinner } from "react-bootstrap";
export default function Cards(props) {
  console.log(props.statistics);
  return (
    <div className="Con-style">
      <div className="Card_One_Style">
        {props.cles.includes("Nombre total de tickets par type") ? (
          <PieType
            statistics={props.statistics["Nombre total de tickets par type"]}
          />
        ) : props.e === "Nombre total de tickets par type" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Nombre de demandes par priorité") ? (
          <PiePriority
            statistics={props.statistics["Nombre de demandes par priorité"]}
          />
        ) : props.e === "Nombre de demandes par priorité" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Ticket par priorité et par mois") ? (
          <HistogramPriority
            statistics={props.statistics["Ticket par priorité et par mois"]}
          />
        ) : props.e === "Ticket par priorité et par mois" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Suivi des bugs") ? (
          <Histogram statistics={props.statistics["Suivi des bugs"]} />
        ) : props.e === "Suivi des bugs" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Ticket par statut et par client") ? (
          <HistogramStatus
            statistics={props.statistics["Ticket par statut et par client"]}
          />
        ) : props.e === "Ticket par statut et par client" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Suivi des temps planifiés") ? (
          <ScatterTime
            statistics={props.statistics["Suivi des temps planifiés"]}
          />
        ) : props.e === "Suivi des temps planifiés" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
        {props.cles.includes("Gestion des incidents") ? (
          <HistogramNbresTickets
            statistics={props.statistics["Gestion des incidents"]}
          />
        ) : props.e === "Gestion des incidents" && props.loading ? (
          <div className="Spinner2">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="Card_Two_Style">
        <Header />
      </div>
      <div className="Card_Three_Style">
        {props.cles.includes("Analyse de la productivité") ? (
          <Tables
            statistics={props.statistics[Object.keys(props.statistics)[0]]}
          />
        ) : props.e === "Analyse de la productivité" && props.loading ? (
          <div className="Spinner">
            <Spinner animation="border" role="status" variant="danger" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
