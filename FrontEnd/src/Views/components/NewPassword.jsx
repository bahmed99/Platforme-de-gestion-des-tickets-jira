import React, { useState, useEffect } from "react";
import logo from "../../Assets/images/1.png";
import image from "../../Assets/images/2.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "../../Assets/css/NewPassword.style.css";
import axios from "axios";

export default function NewpPassword() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatpassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();

  const PostData = () => {
    if (password === repeatpassword) {
      axios
        .post(
          "http://localhost:5000/user/new-password",

          {
            password: password,
            token: token,
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
          setInterval(function () {
            Navigate("/Signin");
          }, 2000);
          //Navigate("/");
        })
        .catch((err) => {
          setError(true);
          setTimeout(() => setError(false), 2500);
        });
    } else {
      
    }
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
      <Alert
        show={success}
        variant={"success"}
        style={{ width: "400px", height: "70", margin: "auto auto" }}
      >
        {"Success Login"}
      </Alert>
      <Alert
        show={error}
        variant={"danger"}
        style={{ width: "400px", height: "70", margin: "auto auto" }}
      >
        {"failed connection"}
      </Alert>
      <div className="containerNewPassword">
        <div className="form-box-NewPassword">
          <img alt="" src={logo} className="photo-Mod-NewPassword" />
          <div
            className="ContainerInputNewPassword"
            style={{ paddingTop: "70px" }}
          >
            <label className="InputNameNewPassword">Password</label>
            <input
              type="password"
              className="input-Style-NewPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            className="ContainerInputNewPassword"
            style={{ paddingTop: "30px" }}
          >
            <label className="InputNameNewPassword">Repeat Password</label>
            <input
              type="password"
              className="input-Style-NewPassword"
              required
              value={repeatpassword}
              onChange={(e) => setRepeatpassword(e.target.value)}
            />
          </div>
          <button className="btn-Style-NewPassword" onClick={() => PostData()}>
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
