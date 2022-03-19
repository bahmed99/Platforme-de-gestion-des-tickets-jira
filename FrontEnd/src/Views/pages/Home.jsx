import React from 'react';

import '../../Assets/styles/App.scss'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';


export default function Home() {

 
    return (
      <div className="container-scroller">
        <Sidebar/>
        <div className="container-fluid page-body-wrapper">
          <Navbar/>
        </div>
      </div>
    );
  

  

}

