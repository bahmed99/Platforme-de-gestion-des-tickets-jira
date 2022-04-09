import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import Dashboard from "../components/Dashboard"
export default function Project() {
  const { project } = useParams();

  const [data, setData] = useState([]);

  const [style, setStyle] = useState(1)

  return (
    <div>
      <div>
        <Sidebar data={data} setData={setData} loading={false} />
        <div className="container-fluid page-body-wrapper">
          <Navbar style={style} setStyle={setStyle} />
        </div>
        <div className="main-panel">
          <div className="content-wrapper" style={style === 1 ?{paddingLeft:"250px"}:{paddingLeft:"70px"}}>       
              <FilterBar />
              <Dashboard /> 
              
          </div>
          
        </div>

      </div>
    </div>
  );
}
