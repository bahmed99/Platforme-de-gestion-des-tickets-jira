
import React, { useState } from "react";

import { useEffect } from 'react';


import "../Assets/styles/Home.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Filterbar from "../components/Filterbar";
import SelectProjects from "../components/Models/SelectProjects";

import ModelFileUpload from "../components/Models/ModelFileUpload";
import Spinner from "../components/Spinner/Spinner";
import "../Assets/css/Spinner.css";
import GetData from "../Actions/GetResponseAction"

export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInformations, setLoadingInformations] = useState(true);

  const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);

  const [selectInfoData, setSelectInfoData] = useState(null);

  const informations={"data":data,"setData":setData,"loading":loading,"setLoading":setLoading,"loadingInformations":loadingInformations,"setLoadingInformations":setLoadingInformations,"ajoutSeanceModalOpen":ajoutSeanceModalOpen,"setAjoutSeanceModalOpen":setAjoutSeanceModalOpen,"uploadFile":uploadFile,"setUploadFile":setUploadFile,"selectInfoData":selectInfoData}

  useEffect(() => {
    GetData(informations)

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
     

