import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import Dashboard from "../components/Dashboard"
export default function Project() {
  const { project } = useParams();

  const [data, setData] = useState([]);
  const [icons, setIcons] = useState([]);

  const [style, setStyle] = useState(1)

  const [statistics,setStatistics] = useState({})
  const [cles, setCles] = useState([])

    //let nameProjects = statistics.keys()   
    //console.log(statistics[(Object.keys(statistics))[4]]);

    

  

  return (
    <div>
      <div>
        <Sidebar data={data} setData={setData} loading={false} icons={icons} setIcons={setIcons} />
        <div className="container-fluid page-body-wrapper">
          <Navbar style={style} setStyle={setStyle} />
        </div>
        <div className="main-panel">
          <div className="content-wrapper" style={style === 1 ?{paddingLeft:"250px"}:{paddingLeft:"70px"}}>       
              <FilterBar statistics={statistics} setStatistics={setStatistics} cles={cles} setCles={setCles} />
              <Dashboard statistics={statistics} setStatistics={setStatistics} cles={cles} setCles={setCles} /> 
              
          </div>
          
        </div>

      </div>
    </div>
  );
}
