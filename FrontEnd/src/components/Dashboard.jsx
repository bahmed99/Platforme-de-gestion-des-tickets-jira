import React from 'react'
import "../Assets/css/Dashboard.style.css"
import Histogram from './Charts/Histogram'
import Pie from './Charts/Pie'
import H_Histogram from './Charts/H_Histogram'
import Tables from './table/Tables'
import Header from './table/Header'



export default function Cards() {
  return (
    <div className='Con-style'>
    <div className='Card_One_Style'>
        <Pie />
        <Histogram />
        <Histogram />
        <Histogram />
        <Histogram />
        <H_Histogram />
    </div>
    <div className='Card_Two_Style'>
        <Header />
        
        
        
    </div>
    <div className='Card_Three_Style'>
      <Tables />
    </div>

    </div>
  )
}
