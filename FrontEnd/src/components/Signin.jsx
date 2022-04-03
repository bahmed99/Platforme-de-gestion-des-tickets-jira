import React, { useState } from "react";
import logo from "../Assets/images/1.png";
import image from "../Assets/images/2.jpg";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
import "../Assets/css/Signin.style.css";
import PostData from "../Actions/SigninAction"
import axios from "axios";

export default function Signin() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const informations={"email":email,"password":password,"error":error,"success":success,"loading":loading,"setEmail":setEmail,"setPassword":setPassword,"setError":setError,"setSuccess":setSuccess,"setLoading":setLoading,"Navigate":Navigate}
  // const PostData = (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   axios
  //     .post(
  //       "http://localhost:5000/user/login",

  //       {
  //         email: email,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setLoading(false)

  //       localStorage.setItem("jwt", res.data.token);
  //       setSuccess(true);
  //       setTimeout(() => setSuccess(false), 2500);
  //       setTimeout(() => Navigate("/"), 500);
  //       setTimeout(() => window.location.reload(), 500);

  //     })
  //     .catch((err) => {
  //       setError(true)
  //       setLoading(false)

  //       setTimeout(() => setError(false), 2500);
  //     });
  // };

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
      <Alert show={success} variant={"success"} style={{ width: "400px", height: "70", margin: "auto auto" }}>
        {"Success Login"}
      </Alert>
      <Alert show={error} variant={"danger"} style={{ width: "400px", height: "70", margin: "auto auto" }}>
        {"Check your informations"}
      </Alert>
      <form onSubmit={(e) => {e.preventDefault();PostData(informations)}}>
        <div className="containerSignin">
          <div className="form-box-Signin">
            <img alt="" src={logo} className="photo-Mod-Signin" onClick={()=>Navigate("/")}/>

            <div className="ContainerInputSignin" style={{ paddingTop: "100px" }}>
              <label className="InputNameSignin">Email</label>
              <input
                type="email"
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
            <h6 className="Forgot-Style"> <Link to='/forgot-password'>Forgot Password ? </Link></h6>
            <button type="submit" className="btn-Style-Signin" disabled={loading} >
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
