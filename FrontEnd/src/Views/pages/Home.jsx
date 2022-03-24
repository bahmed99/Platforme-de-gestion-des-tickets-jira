
import React, { useState } from "react";

import { useEffect } from 'react';


import "../../Assets/styles/Home.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Filterbar from "../components/Filterbar";
import SelectProjects from "../components/SelectProjects";

import ModelFileUpload from "../components/Models/ModelFileUpload";
import Spinner from "../components/Spinner/Spinner";
import "../../Assets/css/Spinner.css";

export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInformations, setLoadingInformations] = useState(true);

  const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);

  const [selectInfoData, setSelectInfoData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/projects/GetReponse`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),

      },
    })
      .then((res) => res.json())
      .then((result) => {

        setLoadingInformations(false);
        if (result.message === true) {
          if (result.file === false) {
            setAjoutSeanceModalOpen(true);
          } else {
            setUploadFile(true);
          }
        } else {
          setLoading(false);
        }
      });

  }, []);

  return (
    <div className="container-scroller">

      {loadingInformations === false ? (
        <div>
          <Sidebar data={data} setData={setData} loading={loading} />
          <div className="container-fluid page-body-wrapper">
            <Navbar />
          </div>
          <div className="main-panel">
            <div className="content-wrapper"></div>
            {ajoutSeanceModalOpen ? (
              <SelectProjects
                isOpen={ajoutSeanceModalOpen}
                setModal={setAjoutSeanceModalOpen}
                selectInfoData={selectInfoData}
                data={data}
                setData={setData}
              />
            ) : (
              ""
            )}
            {uploadFile ? (
              <ModelFileUpload
                isOpen={uploadFile}
                setModal={setUploadFile}
                data={data}
                setData={setData}
              />
            ) : (
              ""
            )}{" "}
            
          </div>
        </div>

       
        

 
      ) : (
        <div className="Spinner">
          {" "}
          <Spinner loading={loadingInformations} />
        </div>
      )}

    </div>
  );
      }
     

