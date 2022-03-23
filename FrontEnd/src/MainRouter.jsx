import React ,{ useEffect } from 'react'
import { Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import NewPassword from './Views/pages/New-password';
import Reset from './Views/components/Reset';
import Signin from './Views/pages/Signin';
import Signup from './Views/pages/Signup';
import Home from './Views/pages/Home';
import HomePage from './Views/pages/HomePage';
import Project from './Views/pages/Project';

export default function MainRouter() {
  const jwt = localStorage.getItem("jwt");
  const history = useNavigate();
  const location = useLocation();
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
      
      
    </Routes>

  )
}
