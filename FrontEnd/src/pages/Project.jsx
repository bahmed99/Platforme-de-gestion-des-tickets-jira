import React, { useState } from "react";
import { useParams } from "react-router-dom";
import image from "../Assets/images/11.png";

import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import "../Assets/css/project.style.css";

import Dashboard from "../components/Dashboard";
export default function Project() {
  var { project } = useParams();
  const [data, setData] = useState([]);
  const [icons, setIcons] = useState([]);

  const [style, setStyle] = useState(1);

  const [e, setE] = useState("");
  const [statistics, setStatistics] = useState({});
  const [cles, setCles] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div >
      <div >
        <Sidebar
          data={data}
          setData={setData}
          loading={false}
          icons={icons}
          setIcons={setIcons}
        />

        <div >
          <div
            className="content-wrapper"
            style={
              style === 1 ? { paddingLeft: "250px" } : { paddingLeft: "70px" }
            }
          >
              <div class="seven" >
                <h1>{project}{" "} PROJECT</h1>
              </div>

                <FilterBar
                  statistics={statistics}
                  setStatistics={setStatistics}
                  cles={cles}
                  setCles={setCles}
                  setLoading={setLoading}
                  loading={loading}
                  e={e}
                  setE={setE}
                />
  
            <>
              <Dashboard
                e={e}
                statistics={statistics}
                setStatistics={setStatistics}
                cles={cles}
                setCles={setCles}
                loading={loading}
              />
            </>
          </div>
        </div>
        <div>
          <Navbar style={style} setStyle={setStyle} />
        </div>
      </div>
    </div>
  );
}