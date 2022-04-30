import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Dropdown, Spinner } from "react-bootstrap";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ModelAddProject from "./Models/ModelAddProject";
import "../Assets/css/Sidebar.style.css";
import GetData from "../Actions/GetSelectedProjectsAction";
import GetUsername from "../Actions/GetUsernameAction";
import ModelResetPassword from "./Models/ModelResetPassword";
import GetUser from "../Actions/GetUserInformationsAction";

import ModelChangeInformations from "./Models/ModelChangeInformations";

function Sidebar(props) {
  const Navigate = useNavigate();

  const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(false);

  const [selectInfoData, setSelectInfoData] = useState(null);

  const [state, setState] = useState({});

  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [allprojects, setAllProject] = useState([]);

  const [difference, setDifference] = useState([]);
  const [resetPasswordModel, setResetPasswordModel] = useState(false);
  const [resetInformationsModel, setResetInformationsModel] = useState(false);

  const informations = {
    setIcons: props.setIcons,
    icons: props.icons,
    setUser: setUser,
    setData: props.setData,
    loading: loading,
    setLoading: setLoading,
    setAllProject: setAllProject,
    setUsername: setUsername,
  };

  function toggleMenuState(menuState) {
    
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach((i) => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  }

  useEffect(() => {
    // if (props.location !== prevProps.location) {
    //   onRouteChanged();
    // }
    GetUsername(informations);
    GetUser(informations);
    if (props.loading === false) {
      GetData(informations);
    }

    onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, [props.loading]);

  function onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(state).forEach((i) => {
      setState({ [i]: false });
    });
  }

  const addProjects = () => {
    setAjoutSeanceModalOpen(true);
    setDifference(allprojects.filter((x) => !props.data.includes(x)));
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle "
                  src={require("../Assets/images/face2.png")}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">
                  <Trans>{username}</Trans>
                </h5>
              </div>
            </div>
            <Dropdown alignright="true">
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="cursor-pointer sidebar-dropdown preview-list">
                <div
                  className="dropdown-item preview-item"
                  onClick={() => setResetInformationsModel(true)}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="fa fa-gear text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content ">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>
                        <div>Account settings</div>
                      </Trans>
                    </p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div
                  className="dropdown-item preview-item"
                  onClick={() => setResetPasswordModel(true)}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="fa fa-key  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>
                        <div>Change Password</div>
                      </Trans>
                    </p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item menu-items">
          <div
            className="nav-link"
            onClick={() => toggleMenuState("formElementsMenuOpen1")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
            <i class="mdi mdi-archive"></i>
            </span>
            <span className="menu-title">
              <Trans>Projects</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.formElementsMenuOpen1}>
            
              <ul className="nav flex-column sub-menu">
                {loading === false ||
                (props.data.length !== 0 && props.icons.length !== 0) ? (
                  <div>
                    {props.data.map((item, i) => {
                      return (
                        <li className="nav-item menu-items" key={i}>
                          <div
                            className="nav-link"
                            onClick={() => {
                              Navigate(`/project/${item}`);
                              window.location.reload();
                            }}
                          >
                            <img
                              src={props.icons[i]}
                              alt=""
                              width={"25px"}
                              style={{ borderRadius: "50%", marginLeft: "5px" }}
                            />

                            <span
                              className="menu-title"
                              style={{ marginLeft: "8px" }}
                            >
                              <Trans>{item}</Trans>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                ) : (
                  <div className="Spinner">
                    <Spinner
                      animation="border"
                      role="status"
                      variant="danger"
                    />
                  </div>
                )}
              </ul>
           
          </Collapse>
        </li>

        <li className="nav-item menu-items">
          <div
            className="nav-link"
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="fa fa-flask"></i>
            </span>
            <span className="menu-title">
              <Trans>Predictions</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.formElementsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link className="nav-link" to="/PredictionNbreParticipant">
                    <Trans>Number of participants</Trans>
                  </Link>
                  <Link className="nav-link" to="/PredictionNbreHours">
                    <Trans>Number of hours for a task</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className="nav-item menu-items liStyleSidebar">
          <div>
            <div
              className={
                state.addPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => toggleMenuState("addPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon divStyleSidebar">
                <i className="mdi mdi-plus"></i>
              </span>
              <span
                className="menu-title spanStyleSidebar"
                onClick={() => addProjects()}
              >
                <Trans>Add new project</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
          </div>
        </li>
      </ul>
      {difference !== [] ? (
        <ModelAddProject
          isOpen={ajoutSeanceModalOpen}
          setModal={setAjoutSeanceModalOpen}
          selectInfoData={selectInfoData}
          difference={difference}
          setDifference={setDifference}
          data={props.data}
          setData={props.setData}
          icons={props.icons}
          setIcons={props.setIcons}
        />
      ) : (
        ""
      )}
      <ModelResetPassword
        setModal={setResetPasswordModel}
        isOpen={resetPasswordModel}
      />
      {user !== "" ? (
        <ModelChangeInformations
          user={user}
          setUser={setUser}
          setModal={setResetInformationsModel}
          isOpen={resetInformationsModel}
          data={props.data}
          setData={props.setData}
        />
      ) : (
        ""
      )}{" "}
    </nav>
  );
}

export default Sidebar;
