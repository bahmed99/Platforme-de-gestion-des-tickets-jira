import React from 'react'
import { Routes, Route } from 'react-router-dom';


export default function MainRouter() {
  return (

    <Routes>
      <Route exact path={"/s"} element={<Home />} >
        ezgezfegergerg
      </Route>
    </Routes>

  )
}

function Home() {
  return <>dezgezg</>
}