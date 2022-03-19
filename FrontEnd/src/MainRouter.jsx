import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NewpPassword from './Views/pages/New-password';
import Reset from './Views/components/Reset';
import Signin from './Views/pages/Signin';
import Signup from './Views/pages/Signup';
import Home from './Views/pages/Home';

export default function MainRouter() {
  return (

    <Routes>
      <Route exact path={"/signup"} element={<Signup />} />
      <Route exact path={"/signin"} element={<Signin />} />
      <Route exact path={"/Reset"} element={<Reset />} />
      <Route exact path={"/reset/:token"} element={<NewpPassword />} />
      <Route exact path={"/home"} element={<Home />} />
      
    </Routes>

  )
}
