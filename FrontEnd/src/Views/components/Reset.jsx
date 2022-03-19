import React, { useState } from "react";
import logo from "../../assets/images/1.png";
import image from "../../assets/images/2.jpg";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "../../assets/css/Reset.style.css";
import axios from "axios";

export default function Reset() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const PostData = () => {
    axios
      .post(
        "http://localhost:5000/user/forgot-password",

        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        setInterval(function(){ Navigate('/Signin') }, 2000);
        //Navigate("/");
      })
      .catch((err) => {
        setError(true);
        setTimeout(() => setError(false), 2500);
      });
  };

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
        {"Success Login"}
      </Alert>
      <Alert show={error} variant={"danger"} style={{width:"400px",height:"70",margin:"auto auto"}}>
        {"failed connection"}
      </Alert>
      <div className="containerReset">
        <div className="form-box-Reset">
          <img alt="" src={logo} className="photo-Mod-Reset" />
          <div className="ContainerInputReset" style={{ paddingTop: "70px" }}>
            <label className="InputNameReset">Email</label>
            <input
              type="text"
              className="input-Style-Reset"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn-Style-Reset" onClick={() => PostData()}>
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
