import React, { useState} from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button} from '@mui/material';

import axios from "axios";

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
    setLoading(true)
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
          setLoading(false)
         
            swal.fire({
              text: `You should provide ${result.data.pred} participant(s)`,
              icon: 'success',
              confirmButtonColor: '#d81e05',
  
            })
        })
        .catch((err) => {
          setLoading(false)

        });
  }
  return (
    <div className="Inscr_form">
      <h3 className="text-center inscri-title" >Predict number of Participants</h3> 
      <MDBContainer >
        <MDBRow >
          <MDBCol md="12">
            <form  onSubmit  ={(e)=>Prediction(e)}>
              <p>Issue Type</p>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={issue} onChange={(event)=>setIssue(event.target.value)}>
                <option selected value="">Open this select menu</option>
                <option value="Bug">Bug</option>
                <option value="T??che">Task</option>
                <option value="Am??lioration">Improvement</option>
                <option value="Sous-t??che">Sub-task</option>
                <option value="Nouvelle fonctionnalit??">New Feature</option>
                <option value="Deprecation">Deprecation</option>
                <option value="Epic">Epic</option>
                <option value="Remove Feature">Remove Feature</option>
                <option value="Patch">Patch</option>
                <option value="Technical task">Technical task</option>
                <option value="Story">Story</option>
                
                
              </select>

              <p>Priority</p>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={priority} onChange={(event)=>setPriority(event.target.value)}>
                <option selected value="">Open this select menu</option>
                <option value="1">Trivial</option>
                <option value="2">Minor</option>
                <option value="3">Major</option>
                <option value="4">Critical</option>
                <option value="5">Blocker</option>
              </select>

              <p>Number of components</p>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"  value={component} onChange={(event)=>setComponent(event.target.value)}>
                <option selected value="">Open this select menu</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <p>Number of versions</p>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={version} onChange={(event)=>setVersion(event.target.value)}>
                <option selected value="">Open this select menu</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <p>Versions type</p>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={typeversion} onChange={(event)=>setTypeversion(event.target.value)} >
                <option selected value="">Open this select menu</option>
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
                <input className="form-select form-select-lg mb-3" type="date" value={date} onChange={(event)=>setDate(event.target.value)}></input>
              <div className="text-center buttonIns">
                <Button
                
                 
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  sx={{
                    backgroundColor: "#d81e05",
                    "&:focus": {
                      backgroundColor: "#d81e05"
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