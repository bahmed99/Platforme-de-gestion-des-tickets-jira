import React, {useState} from 'react';

import '../../Assets/styles/App.scss'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SelectProjects from '../components/SelectProjects';


export default function Home() {
  const [data, setData] = useState([])


    const [ajoutSeanceModalOpen, setAjoutSeanceModalOpen] = useState(true)
    const [selectInfoData, setSelectInfoData] = useState(null);

 
    return (
      <div className="container-scroller">
        <Sidebar/>
        <div className="container-fluid page-body-wrapper">
          <Navbar/>
        </div>
        <SelectProjects isOpen={ajoutSeanceModalOpen}
                    setModal={setAjoutSeanceModalOpen}
                    selectInfoData={selectInfoData}
                    fetchSeances={data}
                    setData={setData}
                    
                />
      </div>
    );
  

  

}

