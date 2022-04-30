import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../Assets/styles/Home.scss";
import ModalForm from "./ModalFromHours";

export default function NbreParticipant() {
  const [data, setData] = useState([]);
  const [icons, setIcons] = useState([]);
  const [style, setStyle] = useState(1);
  return (
    <div>
      
        <Sidebar
          data={data}
          setData={setData}
          loading={false}
          icons={icons}
          setIcons={setIcons}
        />
        <div>
          <div
            className="content-wrapper"
            style={
              style === 1 ? { paddingLeft:"400px" } : { paddingLeft: "70px" }
            }
          >
            <ModalForm />
          </div>
        </div>
        <div>
          <Navbar style={style} setStyle={setStyle} />
        </div>
      
    </div>
  );
}
