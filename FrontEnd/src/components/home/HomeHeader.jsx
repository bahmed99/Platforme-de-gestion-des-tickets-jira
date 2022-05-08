import React from "react";

import ParticlesBg from 'particles-bg'

import image from '../../Assets/images/background.jpg'

export default function HomeHeader() {
  let config = {
    color: ["#ffffff", "#ffffff"],
    body: image,
    onParticleUpdate: (ctx, particle) => {
        console.log(ctx)
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    }
  };
 
  return (
    <div  style={{
      zIndex:0,
      backgroundImage: "url(" + image + ")",
      backgroundSize: "cover",
      height: "100vh",
      color: "#f5f5f5",
      justifyContent:"center",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      position:"relative",
      right: 0,
      left:0,
      textAlign:"center"

    }}>
      <div className="homeText" style={{paddingTop:"35vh" }}>
        <h2 className="">“The goal is to turn data into information, and information into insight.”</h2>
        <h2>— Carly Fiorina</h2>
      </div>
      <ParticlesBg type="cobweb" bg={true} num={100} config={config}  />    
    </div>
  );
}