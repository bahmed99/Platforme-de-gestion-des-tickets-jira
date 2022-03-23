import React, {useState} from 'react';

import '../../Assets/styles/App.scss'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import SelectProjects from '../components/SelectProjects';
import { useEffect } from 'react';
import ModelFileUpload from '../components/Models/ModelFileUpload';



export default function Home() {


    const[ data , setData] = useState([])
    const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(false)
    const [uploadFile, setUploadFile] = useState(false)
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
          if (result.message === true)
          {
            if(result.file===false)
              setAjoutSeanceModalOpen(true)
            else
              setUploadFile(true)
          }
        })
        
      
        
    }, []);


    

  return (
    <div className="container-scroller">
      <Sidebar data={data}  setData= {setData}/>
      <div className="container-fluid page-body-wrapper">
        <Navbar />

      </div>
      <div className="main-panel">
        <div className="content-wrapper">
 
        </div>
        {ajoutSeanceModalOpen ?<SelectProjects isOpen={ajoutSeanceModalOpen}
                    setModal={setAjoutSeanceModalOpen}

                    selectInfoData={selectInfoData}
                    data={data}  setData= {setData} />:""}

        {uploadFile ?<ModelFileUpload isOpen={uploadFile} setModal={setUploadFile} />:""}

      </div>
    </div>

  );
}

