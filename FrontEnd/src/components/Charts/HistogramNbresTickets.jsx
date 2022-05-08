import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function HistogramPriority(props) {

    var data = [
        {
          x: Object.keys(props.statistics),
          y:Object.values(props.statistics),
          type: 'bar'
        }
      ];
  return (
      
    <div>
      <Plot
        data={data}
        layout={{
          width: 400,
          height: 400,
          title: "Number of tickets for the next period",
        }}
      />
    </div>
  );
}