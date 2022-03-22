import React, { Component } from 'react';
import '../../Assets/styles/Home.scss'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filterbar from '../components/Filterbar';
import Footer from '../components/Footer';


export default function Home() {
  
    return (
      <div className="container-scroller">
        <Sidebar/>
        <div className="container-fluid page-body-wrapper">
         <Navbar/>
          <div className="main-panel">
            <div className="content-wrapper">
              <Filterbar/>
            </div>
           
          </div>
        </div>
      </div>
    );
   
  }

 



