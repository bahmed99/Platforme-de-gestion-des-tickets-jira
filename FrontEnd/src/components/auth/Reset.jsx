import React, { useState } from "react";
import logo from "../../Assets/images/1.png";
import image from "../../Assets/images/2.jpg";
import {  useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "../../Assets/css/Reset.style.css";
import ReactLoading from "react-loading";
import PostData from "../../Actions/ResetPasswordAction"

export default function Reset() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const informations={"email":email,"error":error,"success":success,"loading":loading,"setEmail":setEmail,"setError":setError,"setSuccess":setSuccess,"setLoading":setLoading,"Navigate":Navigate}

  

  return (
    <div
      
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
        <br />
      <Alert show={success} variant={"success"} style={{width:"400px",height:"70",margin:"auto auto"}}>
        {"Check your email"}
      </Alert>
      <Alert show={error} variant={"danger"} style={{width:"400px",height:"70",margin:"auto auto"}}>
        {"Account not found"}
      </Alert>
      <form onSubmit={(e) => {e.preventDefault();PostData(informations)}}>
      <div className="containerReset">
        <div className="form-box-Reset">
          <img alt="" src={logo} className="photo-Mod-Reset" onClick={()=>Navigate("/")}/>
          <div className="ContainerInputReset" style={{ paddingTop: "70px" }}>
            <label className="InputNameReset">Email</label>
            <input
              type="email"
              className="input-Style-Reset"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn-Style-Reset" type="submit" >
          {loading ? (
                <ReactLoading
                    height={"30px"}
                    width={"30px"}
                    type="spin"
                    className="loadingSpin"
                />
            ) : (
                "Submit"
            )}
          </button>
        </div>
      </div>

      </form>
    </div>
  );
}
