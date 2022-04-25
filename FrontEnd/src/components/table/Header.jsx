import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";


import axios from "axios";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";


const Header = () => {
  const { project } = useParams(); 
  const [cards,setCards]=useState({});
  useEffect(() => {
  axios
        .post(
          "http://localhost:5000/visuals/GetCardData",

          {
            projet: project,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("jwt"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.card_data)
        setCards(res.data.card_data)
          
          
          
        })
          
      .catch((err) => {
      });
    },[])
  return (
    <div>
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Bugs
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">{cards["nb_bugs"]}</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-danger text-white rounded-circle shadow">
              <i className="fa fa-exclamation-triangle" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-danger mr-2">
            <i className={`fa fa-arrow-${cards["arrow"]}`}/> {cards["pourcentage"]}%
          </span>{" "}
          <span className="text-nowrap">Since last month</span>
        </p>
      </CardBody>
    </Card>
    <br/>
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Free employees
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">4</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-info text-white rounded-circle shadow">
              <i className="fa fa-users" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-nowrap">Total Employees : {" "}</span>
          <span className="text-danger mr-2">
           23 
          </span>
        </p>
      </CardBody>
    </Card>
    <br/>
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Tickets opened today
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">4</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-info text-white rounded-circle shadow">
              <i className="fa fa-users" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-nowrap">Total Employees : {" "}</span>
          <span className="text-danger mr-2">
           23 
          </span>
        </p>
      </CardBody>
    </Card>
    <br/>
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Free employees
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">4</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-info text-white rounded-circle shadow">
              <i className="fa fa-users" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-nowrap">Total Employees : {" "}</span>
          <span className="text-danger mr-2">
           23 
          </span>
        </p>
      </CardBody>
    </Card>
    <br/>
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Free employees
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">4</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-info text-white rounded-circle shadow">
              <i className="fa fa-users" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-nowrap">Total Employees : {" "}</span>
          <span className="text-danger mr-2">
           23 
          </span>
        </p>
      </CardBody>
    </Card>
    </div>
  );
};

export default Header;
