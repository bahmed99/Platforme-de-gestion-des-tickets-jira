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

export default function Cards(props) {

  return (
    <div className="Con-style">
      <div className="Card_One_Style">
        {props.cles.includes("Nombre total de tickets par type") ? (
          <PieType
            statistics={props.statistics[Object.keys(props.statistics)[4]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Nombre de demandes par priorité") ? (
          <PiePriority
            statistics={props.statistics[Object.keys(props.statistics)[2]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Ticket par priorité et par mois") ? (
          <HistogramPriority
            statistics={props.statistics[Object.keys(props.statistics)[7]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Suivi des bugs") ? (
          <Histogram
            statistics={props.statistics[Object.keys(props.statistics)[5]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Ticket par statut et par client") ? (
          <HistogramStatus
            statistics={props.statistics[Object.keys(props.statistics)[7]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Suivi des temps planifiés") ? (
          <ScatterTime
            statistics={props.statistics[Object.keys(props.statistics)[6]]}
          />
        ) : (
          ""
        )}
        {props.cles.includes("Gestion des incidents") ? (
          <HistogramNbresTickets
            statistics={props.statistics[Object.keys(props.statistics)[1]]}
          />
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
