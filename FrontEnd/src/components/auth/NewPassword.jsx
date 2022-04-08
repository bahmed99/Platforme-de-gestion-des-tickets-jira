import React, { useState, useEffect } from "react";
import logo from "../../Assets/images/1.png";
import image from "../../Assets/images/2.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
import "../../Assets/css/NewPassword.style.css";
import PostData from "../../Actions/NewPasswordAction"

export default function NewPassword() {
  useEffect(() => {
    localStorage.clear();
  }, []);


  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatpassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useParams();

  const informations={"password":password,"repeatpassword":repeatpassword,"token":token,"error":error,"success":success,"loading":loading,"setError":setError,"setSuccess":setSuccess,"setLoading":setLoading,"Navigate":Navigate}

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
        {"Password changed successfully"}
      </Alert>
      <Alert
        show={error}
        variant={"danger"}
        style={{ width: "400px", height: "70", margin: "auto auto" }}
      >
        {"Token expiried"}
      </Alert>
      <form onSubmit={(e) =>{e.preventDefault();PostData(informations)}} >
        <div className="containerNewPassword">
          <div className="form-box-NewPassword">
            <img alt="" src={logo} className="photo-Mod-NewPassword" onClick={()=>Navigate("/")} />
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
            <button type="submit" className="btn-Style-NewPassword" >
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
