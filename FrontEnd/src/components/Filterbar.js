import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";

import axios from "axios";
// import "../Assets/css/Filterbar.styles.css";

export default function Filterbar() {
  const { id } = useParams();
  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .patch(
        `http://localhost:5000/visuals/SaveVisuals`,

        {

          selected_projects: data,
          visuals: checked,
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
    } else {
      updatedList.splice(checked.indexOf(event.target.name), 1);
      setChecked(updatedList);
    }


  };
  console.log(checked);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/projects/GetSelectedProjects`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.projects.selected_projects);
      });
  }, []);


  const PostData = () => {
    axios
      .post(
        `http://localhost:5000/visuals/SaveVisuals`,

        {

          selected_projects: data,
          visuals: checked,
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
  };

  return (
    <div className='filterbarcontainer'>
      <div className="row">
      <form>
        <fieldset>
          
            <label class="control" for="technology">
              <input type="checkbox" name="Suivi des bugs" id="technology" onClick={handleCheck}></input>
              <span class="control__content">
                Suivi des bugs
              </span>
            </label>
            <label class="control" for="health">
              <input type="checkbox" name="Gestion des incidents" id="health" onClick={handleCheck}></input>
              <span class="control__content">
                Gestion des incidents
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name="Analyse de la productivité" id="science" onClick={handleCheck}></input>
              <span class="control__content">
                Analyse de la productivité
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name="Suivi des temps planifiés" id="science" onClick={handleCheck}></input>
              <span class="control__content">
                Suivi des temps planifiés
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name="Nombre de demandes par priorité" onClick={handleCheck}></input>
              <span class="control__content">
                Nombre de demandes par priorité
              </span>
            </label>
          
            <label class="control" name="science">
              <input type="checkbox" name="Nombre total de tickets par type" id="science" onClick={handleCheck}></input>
              <span class="control__content">
                Nombre total de tickets par type
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name=" Nombre total de tickets par intervenant" id="science" onClick={handleCheck}></input>
              <span class="control__content">
                Nombre total de tickets par intervenant
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name="Ticket par priorité et par mois" id="science" onClick={handleCheck}></input>
              <span class="control__content">
                Ticket par priorité et par mois
              </span>
            </label>
            <label class="control" name="science">
              <input type="checkbox" name="Ticket par statut et par client" id="science" onClick={handleCheck}></input>
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