import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function Histogram(props) {

  if (Object.values(props.statistics).length !== 0)
  {
      var plot1 = {
        x: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          y: [props.statistics.Jan, props.statistics.Feb,props.statistics.Mar,props.statistics.Apr,props.statistics.May,props.statistics.Jun,props.statistics.Aug,props.statistics.Sep,props.statistics.Oct,props.statistics.Nov,props.statistics.Dec],
          type: "bar",
          name: 'Prédiction'
        };
        
     
  }
  else
  {
      var plot1 = {
          x: [],
          y: [],
          type: "bar",
          name: 'Prédiction'
        };
        
     
  }


  


  var data = [plot1];
  return (
    <div>
      <Plot
        data={data}
        layout={{
          width: 400,
          height: 400,
          title: "Bug tracking",
        }}
      />
    </div>
  );
}
