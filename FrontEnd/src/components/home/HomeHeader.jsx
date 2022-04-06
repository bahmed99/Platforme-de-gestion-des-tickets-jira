import React, { useEffect, useState } from "react";

import ParticlesBg from 'particles-bg'



export default function HomeHeader() {
  let config = {
   
    onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    }
  };
 
  return (
    <>
      <ParticlesBg type="cobweb" bg={true} num={200} config={config}/>    </>
  );
}
