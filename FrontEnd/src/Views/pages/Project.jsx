import React from 'react'
import { useParams } from 'react-router-dom';

export default function Project() {
    const { project } = useParams();
    
  return (
    <div><h1>{project}</h1></div>
  )
}
