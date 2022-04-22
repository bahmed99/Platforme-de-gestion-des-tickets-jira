import React ,{ useEffect } from 'react'
import { Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import NewPassword from './pages/New-password';
import Reset from './pages/Reset';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Project from './pages/Project';

import ModalForm from './pages/ModalFrom'
import NbreParticipant from './pages/NbreParticipants';

export default function MainRouter() {
  const jwt = localStorage.getItem("jwt");

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
    

  //   if (jwt) {
  //     if (
  //       !history.location.pathname.startsWith("/cours") &&
  //       !history.location.pathname.startsWith("/tests") &&
  //       !history.location.pathname.startsWith("/test") &&
  //       !history.location.pathname.startsWith("/avis") &&
  //       !history.location.pathname.startsWith("/reset") &&
  //       !history.location.pathname.startsWith("/emplois")
  //     ) {
  //       history.push("/");
  //     }
  //   } 
      
  //    else {
  //     if (
  //       !location.pathname.startsWith("/reset") &&
  //       !location.pathname.startsWith("/forgot-password") &&
  //       !location.pathname.startsWith("/sign-in")
  //     ) {
  //       history("/");
  //     }
  //   }
  // }, []);

  return (

    <Routes>
      <Route exact path={"/sign-up"} element={<Signup />} />
      <Route exact path={"/sign-in"} element={<Signin />} />
      <Route exact path={"/forgot-password"} element={<Reset />} />
      <Route exact path={"/reset/:token"} element={<NewPassword />} />
      
      <Route exact path={"/project/:project"} element={<Project />} />

      {jwt ?<Route exact path={"/"} element={<Home />} /> :
      <Route exact path={"/"} element={<HomePage />} />}
      <Route exact path={"/PredictionNbreParticipant"} element={<NbreParticipant />} />
      
      
    </Routes>

  )
}
