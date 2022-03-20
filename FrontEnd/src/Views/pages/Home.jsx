import React from 'react';

import '../../Assets/styles/App.scss'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FileUpload from "../components/inputs/FileUpload";


export default function Home() {


  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />

      </div>
      <div className="main-panel">
        <div className="content-wrapper">
          <FileUpload />
 
        </div>
      </div>
    </div>

  );
}

