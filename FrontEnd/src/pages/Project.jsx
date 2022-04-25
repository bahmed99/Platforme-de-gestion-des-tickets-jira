import React, { useState } from "react";


import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import Dashboard from "../components/Dashboard";
import { useParams } from "react-router-dom";
export default function Project() {

  const {project} =useParams()
  const [data, setData] = useState([]);
  const [icons, setIcons] = useState([]);

  const [style, setStyle] = useState(1);

  const [e, setE] = useState("");
  const [statistics, setStatistics] = useState({});
  const [cles, setCles] = useState([]);
  const [loading, setLoading] = useState(true);


  //let nameProjects = statistics.keys()
  //console.log(statistics[(Object.keys(statistics))[4]]);

  return (
    <div>
      <div>
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
            <div>
            <h1 style={{ color: "black", fontSize: "45px", alignItems: "center" , marginTop:"70px",marginBottom:"-70px",marginLeft:"500px"}}> {project} Project</h1>
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
        <div >
          <Navbar style={style} setStyle={setStyle} />
        </div>

      </div>
    </div>
  );
}
