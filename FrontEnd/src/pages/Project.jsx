import React, { useState } from "react";

import { css } from "@emotion/react";
import CircleLoader from "react-spinners/RingLoader";
import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import Dashboard from "../components/Dashboard";
export default function Project() {
  const [data, setData] = useState([]);
  const [icons, setIcons] = useState([]);

  const [style, setStyle] = useState(1);

  const [statistics, setStatistics] = useState({});
  const [cles, setCles] = useState([]);
  const [loading, setLoading] = useState(true);
  const override = css`
    display:flex;
    margin: auto auto ;
    align-items: center;
    justify-content: center;
  `;

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
        <div className="container-fluid page-body-wrapper">
          <Navbar style={style} setStyle={setStyle} />
        </div>
        <div className="main-panel">
          <div
            className="content-wrapper"
            style={
              style === 1 ? { paddingLeft: "250px" } : { paddingLeft: "70px" }
            }
          >
            <FilterBar
              statistics={statistics}
              setStatistics={setStatistics}
              cles={cles}
              setCles={setCles}
              setLoading={setLoading}
              loading={loading}
            />
            {!loading ? (
              <>
                <Dashboard
                  statistics={statistics}
                  setStatistics={setStatistics}
                  cles={cles}
                  setCles={setCles}
                />
              </>
            ) : (
              <div className="sweet-loading">
                <CircleLoader
                  color={"#1f212d"}
                  loading={loading}
                  css={override}
                  size={100}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
