import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function ScatterTime(props) {
    // var trace1 = {
    //     x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    //     y: [props.statistics.Monday[0], props.statistics.Tuesday[0],props.statistics.Wednesday[0],props.statistics.Thursday[0],props.statistics.Friday[0],props.statistics.Saturday[0],props.statistics.Sunday[0]],
    //     fill: 'tozeroy',
    //     type: 'scatter'
    //   };
      
    //   var trace2 = {
    //     x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    //     y: [props.statistics.Monday[1], props.statistics.Tuesday[1],props.statistics.Wednesday[1],props.statistics.Thursday[1],props.statistics.Friday[1],props.statistics.Saturday[1],props.statistics.Sunday[1]],
    //     fill: 'tonexty',
    //     type: 'scatter'
    //   };
    if (Object.values(props.statistics).length !== 0)
    {
        var trace1 = {
            x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            y: [props.statistics.Monday[0], props.statistics.Tuesday[0],props.statistics.Wednesday[0],props.statistics.Thursday[0],props.statistics.Friday[0],props.statistics.Saturday[0],props.statistics.Sunday[0]],
            mode: 'lines+markers',
            name: 'Prediction'
          };
          
        var trace2 = {
            x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            y: [props.statistics.Monday[1], props.statistics.Tuesday[1],props.statistics.Wednesday[1],props.statistics.Thursday[1],props.statistics.Friday[1],props.statistics.Saturday[1],props.statistics.Sunday[1]],
        mode: 'lines+markers',
        name: 'Real'
        };
    }
    else
    {
        var trace1 = {
            x: [],
            y: [],
            mode: 'lines+markers',
            name: 'Prediction'
          };
          
        var trace2 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        name: 'Real'
        };
    }
    
      
      var data = [trace1, trace2 ];


  return (
    <div>
      <Plot
        data={data}
        layout={{
          width: 400,
          height: 400,
          title: "Scheduled time tracking",
        }}
      />
    </div>
  );
}