import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";

import axios from "axios";
import "../Assets/css/Filterbar.styles.css";

export default function Filterbar() {
  const { project } = useParams();
  const [checked, setChecked] = useState([]);

  const [data, setData] = useState([])
  

  const [error, setError] = useState(false);
  console.log(project)

  useEffect(() => {
    axios
      .patch(
        `http://localhost:5000/visuals/SaveVisuals`,

        {

          selected_projects: data,
          visuals: checked,
          projet: project,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .catch((err) => {
        setError(true)
        setTimeout(() => setError(false), 2500);
      });
  }, [checked]);

  const handleCheck = async (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.name];
      setChecked(updatedList);
    } 
    else {
      updatedList.splice(checked.indexOf(event.target.name), 1);
      setChecked(updatedList);
    }

  
  
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/visuals/GetSaveVisuals`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setChecked(result.visuals);

        
        
      });


    

      
  }, []);



  const handleCheck = (event) => {
    
    var updatedList = [...checked];
    
    if (event.target.checked) {
      updatedList = [...checked, event.target.name];
      setChecked(updatedList);
    } else {
      updatedList.splice(checked.indexOf(event.target.name), 1);
      setChecked(updatedList);
    }

    axios
      .patch(
        `http://localhost:5000/visuals/SaveVisuals`,

        {
          visuals: updatedList,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .catch((err) => {
      });


  };





  return (
    <div className='filterbarcontainer'>
      <div className="row">
      <form id="formulaire">
        <fieldset>
          
            <label class="control" >
              <input className='StyleInput' type="checkbox" name="Suivi des bugs"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Suivi des bugs")}  ></input>
              <span class="control__content">
                Suivi des bugs
              </span>
            </label>
            <label class="control" >
              <input className='StyleInput' type="checkbox" name="Gestion des incidents"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Gestion des incidents")}></input>
              <span class="control__content">
                Gestion des incidents
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" className='StyleInput' name="Analyse de la productivité"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Analyse de la productivité")}></input>
              <span class="control__content">
                Analyse de la productivité
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" className='StyleInput' name="Suivi des temps planifiés"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Suivi des temps planifiés")}></input>
              <span class="control__content">
                Suivi des temps planifiés
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" className='StyleInput' name="Nombre de demandes par priorité" onChange={(event) =>handleCheck(event)} checked={checked.includes("Nombre de demandes par priorité")}></input>
              <span class="control__content">
                Nombre de demandes par priorité
              </span>
            </label>
          
            <label class="control" name="science">
              <input type="checkbox" className='StyleInput' name="Nombre total de tickets par type"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Nombre total de tickets par type")}></input>
              <span class="control__content">
                Nombre total de tickets par type
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox"  className='StyleInput' name="Nombre total de tickets par intervenant"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Nombre total de tickets par intervenant")}></input>
              <span class="control__content">
                Nombre total de tickets par intervenant
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox"  className='StyleInput' name="Ticket par priorité et par mois"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Ticket par priorité et par mois")}></input>
              <span class="control__content">
                Ticket par priorité et par mois
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" className='StyleInput' name="Ticket par statut et par client"  onChange={(event) =>handleCheck(event)} checked={checked.includes("Ticket par statut et par client")}></input>
              <span class="control__content">
                Ticket par statut et par client
              </span>
            </label>
         
        </fieldset>
        </form> 
      </div>
    </div>

  );
}