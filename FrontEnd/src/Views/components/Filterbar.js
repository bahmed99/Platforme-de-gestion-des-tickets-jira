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
    const [visuals, setVisuals] = useState([]);
    const [error, setError] = useState(false);

    const AjoutChamps = (event, newValue) => {
        setVisuals([...visuals, newValue]);
    };
    console.log(visuals);
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
            `http://localhost:5000/user/visuals`,
    
            {
            
              projects : data, 
              visuals : visuals,
            },
            {
              headers: {
                "Content-Type": "application/json",
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
                                value="start"
                                control={<Checkbox />}
                                label="Suivi des bugs"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Gestion des incidents"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Analyse de la productivité"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Suivi des temps planifiés"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Nombre de demandes par priorité"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Nombre total de tickets par type"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Nombre total de tickets par intervenant"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Tikcte par priorité et par mois"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox />}
                                label="Ticket par statut et par client"
                                labelPlacement="start"
                                onChange={(e) => AjoutChamps(e.target.label)}
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