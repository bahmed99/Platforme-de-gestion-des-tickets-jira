import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "../../Assets/css/Filterbar.styles.css";

export default function Filterbar() {
    const { id } = useParams();
    const [checked,setChecked] = useState([]);
    const [error, setError] = useState(false);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
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
            
              selected_projects : data, 
              visuals : checked,
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
                <div className="col-12 grid-margin">

                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="Suivi des bugs"
                                control={<Checkbox />}
                                label="Suivi des bugs"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Gestion des incidents"
                                control={<Checkbox />}
                                label="Gestion des incidents"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Analyse de la productivité"
                                control={<Checkbox />}
                                label="Analyse de la productivité"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Suivi des temps planifiés"
                                control={<Checkbox />}
                                label="Suivi des temps planifiés"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Nombre de demandes par priorité"
                                control={<Checkbox />}
                                label="Nombre de demandes par priorité"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Nombre total de tickets par type"
                                control={<Checkbox />}
                                label="Nombre total de tickets par type"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Nombre total de tickets par intervenant"
                                control={<Checkbox />}
                                label="Nombre total de tickets par intervenant"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Tikcte par priorité et par mois"
                                control={<Checkbox />}
                                label="Tikcte par priorité et par mois"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />
                            <FormControlLabel
                                value="Ticket par statut et par client"
                                control={<Checkbox />}
                                label="Ticket par statut et par client"
                                labelPlacement="start"
                                onChange={handleCheck}
                            />



                        </FormGroup>
                    </FormControl>

                    <button
                        className="btn-Style"
                        onClick={() => PostData()}
                    >
                        Submit{" "}
                    </button>
                </div>

            </div>
        </div>

    );
}