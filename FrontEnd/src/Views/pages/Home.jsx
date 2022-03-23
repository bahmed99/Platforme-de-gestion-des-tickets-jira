import '../../Assets/styles/Home.scss'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filterbar from '../components/Filterbar';
import Footer from '../components/Footer';

import SelectProjects from '../components/SelectProjects';
import { useEffect } from 'react';



export default function Home() {
  const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(false)
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
        if (result.message === true) {
          setAjoutSeanceModalOpen(true)
        }
      })



  }, []);

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
        
            <SelectProjects isOpen={ajoutSeanceModalOpen}
              setModal={setAjoutSeanceModalOpen}
              selectInfoData={selectInfoData}
            />
            <Filterbar/>
          </div>

        </div>
      </div>
    </div>

);
}
