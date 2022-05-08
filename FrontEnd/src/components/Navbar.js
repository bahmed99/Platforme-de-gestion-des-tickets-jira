import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import { Trans } from "react-i18next";
import GetData from "../Actions/GetUsernameAction";
import GetNotifications from "../Actions/GetNotificationsAction";
import { useNavigate } from "react-router-dom";
export default function Navbar(props) {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const informations = {
    setUsername: setUsername,
    setData: setData,
    setLoading: setLoading,
  };
  const Navigate = useNavigate();

  function toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  function toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }

  function Disconnect() {
    localStorage.clear();
    Navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    GetData(informations);
    GetNotifications(informations);
  }, []);
  function getDataLength(data) {
    let s = 0;
    for (let i = 0; i < data.length; i++) {
      s += data[i].length;
    }
   

    return s;
  }

  return (
    <nav className="navbar1 navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-toggler align-self-center"
          type="button"
          onClick={() => {
            if (props.style === 0) {
              props.setStyle(1);
            } else {
              props.setStyle(0);
            }
            document.body.classList.toggle("sidebar-icon-only");
          }}
        >
          <span className="mdi mdi-menu"></span>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <Dropdown alignright="true" as="li" className="nav-item border-left">
            <Dropdown.Toggle
              as="a"
              className="nav-link count-indicator cursor-pointer"
            >
              <i className="mdi mdi-bell"></i>
              {getDataLength(data) !== 0 && !loading ? (
                <span className="count bg-danger"></span>
              ) : (
                ""
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
              <h6 className="p-3 mb-0">
                <Trans>Notifications</Trans>
              </h6>
              <Dropdown.Divider />
              {data.map((e, i) =>
                e.slice(0, 3).map((element, index) => (
                  <div key={(index+1)*100+i +Math.floor(Math.random() * 5000)}>
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon  rounded-circle">
                          <i
                            className="fa fa-exclamation-triangle"
                            style={
                              element.priority === "low"
                                ? { color: "#D1D100" }
                                : element.priority === "medium"
                                ? { color: "orange" }
                                : { color: "red" }
                            }
                          ></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">{element.key}</p>
                        <p className="text-muted ellipsis mb-0">
                          {element.msg}
                        </p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </div>
                ))
              )}

              <p
                className="p-3 mb-0 text-center cursor-pointer"
                onClick={() => Navigate("/")}
              >
                <Trans>See all notifications</Trans>
              </p>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown alignright="true" as="li" className="nav-item">
            <Dropdown.Toggle
              as="a"
              className="nav-link cursor-pointer no-caret"
            >
              <div className="navbar-profile">
                <img
                  className="img-xs rounded-circle"
                  src={require("../Assets/images/face2.png")}
                  alt="profile"
                />
                <p className="mb-0 d-none d-sm-block navbar-profile-name">
                  <Trans>{username}</Trans>
                </p>
                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
              <h6 className="p-3 mb-0">Profile</h6>
              <Dropdown.Divider />
              <Dropdown.Item className="preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="fa fa-gear text-success"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Settings</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="preview-item"
                onClick={() => Disconnect()}
              >
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Log Out</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className="p-3 mb-0 text-center">
                <Trans>Advanced settings</Trans>
              </p>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="mdi mdi-format-line-spacing"></span>
        </button>
      </div>
    </nav>
  );
}
