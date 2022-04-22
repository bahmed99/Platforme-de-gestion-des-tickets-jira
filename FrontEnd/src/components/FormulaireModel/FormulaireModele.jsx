import React, { useState, useRef } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Alert } from 'react-bootstrap';
import axios from "axios";
import logo16 from '../../Assets/images/1.png'
import swal from 'sweetalert2'
import ReactLoading from "react-loading";
import "../../Assets/css/InscriptionFormulaire.css";

function FormulaireModele() {
  const [loading, setLoading] = useState(false);
  const [issue,setIssue] = useState("") ;
  const [priority,setPriority] = useState("") ;
  const [component,setComponent] = useState("") ;
  const [version,setVersion] = useState("") ;
  const [typeversion,setTypeversion] = useState("") ;
  const [date,setDate] = useState(new Date()) ;
  
  function Prediction(e)
  {
    e.preventDefault() ;
    axios
        .post("http://localhost:5000/prediction/prediction",
        {
          "issue": issue,
          "priority": priority,
          "component": component,
          "version":version,
          "typeversion":typeversion,
          "date":date
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
          console.log(result.data.pred);
            swal.fire({
              text: `You must provide ${result.data.pred} participant(s)`,
              icon: 'success',
              confirmButtonColor: '#2ea3dd',
  
            })
        })
        .catch((err) => {
          
        });
  }


  

  return (
    <div className="Inscr_form">
      <h3 className="text-center inscri-title" >Prediction Number of participant</h3> 
      <MDBContainer >
        <MDBRow >
          <MDBCol md="12">
            <form >
               
              
              

              <p>issue Type</p>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={issue} onChange={(event)=>setIssue(event.target.value)}>
                <option selected>Open this select menu</option>
                <option value="Bug">Bug</option>
                <option value="Tâche">Task</option>
                <option value="Amélioration">Improvement</option>
                <option value="Sous-tâche">Sub-task</option>
                <option value="Nouvelle fonctionnalité">New Feature</option>
                <option value="Deprecation">Deprecation</option>
                <option value="Epic">Epic</option>
                <option value="Remove Feature">Remove Feature</option>
                <option value="Patch">Patch</option>
                <option value="Technical task">Technical task</option>
                <option value="Story">Story</option>
                
                
              </select>

              <p>Priority</p>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={priority} onChange={(event)=>setPriority(event.target.value)}>
                <option selected>Open this select menu</option>
                <option value="1">Trivial</option>
                <option value="2">Minor</option>
                <option value="3">Major</option>
                <option value="4">Critical</option>
                <option value="5">Blocker</option>
              </select>

              <p>Number of components</p>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"  value={component} onChange={(event)=>setComponent(event.target.value)}>
                <option selected>Open this select menu</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <p>Number of versions</p>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={version} onChange={(event)=>setVersion(event.target.value)}>
                <option selected>Open this select menu</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <p>Versions type</p>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={typeversion} onChange={(event)=>setTypeversion(event.target.value)} >
                <option selected>Open this select menu</option>
                <option value="Majeur">Major</option>
                <option value="Mineur">Minor</option>
                <option value="Patch">Patch</option>
              </select>
              <p>Date</p>
              {/* <MDBInput
                  required
                  
                  icon="calendar-alt"
                  group
                  type="date"
                  validate
                  error="wrong"
                  success="right"
                  hint="Placeholder"
                  value={Birthday}
                  onChange={handleBirthdayChange}
                  onBlur={handleBirthdayChange}
                /> */}
                <input class="form-select form-select-lg mb-3" type="date" value={date} onChange={(event)=>setDate(event.target.value)}></input>
              <div className="text-center buttonIns">
                <Button
                
                  onClick={(e)=>Prediction(e)}
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  sx={{
                    backgroundColor: "#2ea3dd",
                    "&:focus": {
                      backgroundColor: "#2ea3dd"
                    },
                  }}
                >

                  {loading ? (
                    <ReactLoading
                      height={"20px"}
                      width={"24px"}
                      className="loading1"
                      type="spin"
                    />
                  ) : (
                    "Predict"
                  )}

                </Button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default FormulaireModele;