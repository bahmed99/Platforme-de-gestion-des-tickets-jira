import React, { useState } from "react";
import logo from "../../Assets/images/1.png";
import image from "../../Assets/images/2.jpg";
import { Link, useNavigate  } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "../../Assets/css/Signin.style.css";
import axios from "axios";

export default function Signin() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const PostData = () => {
    axios
      .post(
        "http://localhost:5000/user/login",

        {
          email:email,
          password:password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        
          localStorage.setItem("jwt", res.data.token);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2500);
          //Navigate("/");
        
      })
      .catch((err) => {
        setError(true)
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
      <div className="containerSignin">
        <div className="form-box-Signin">
          <img alt="" src={logo} className="photo-Mod-Signin" />
          <div className="ContainerInputSignin" style={{ paddingTop: "100px" }}>
            <label className="InputNameSignin">Username</label>
            <input
              type="text"
              className="input-Style"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="ContainerInputSignin">
            <label className="InputNameSignin">Password</label>
            <input
              type="password"
              className="input-Style"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h6 className="Forgot-Style"> <Link to='/Reset'>Mot de passe oublié ? </Link></h6>
          <button className="btn-Style-Signin" onClick={() => PostData()}>
            Submit{" "}
          </button>
        </div>
      </div>
      
    </div>
  );
}
