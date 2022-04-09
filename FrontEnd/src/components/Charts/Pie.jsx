import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function Pie() {
  var ultimateColors = [
    [
      "green",
      "rgb(18, 36, 37)",
      "rgb(34, 53, 101)",
      "rgb(36, 55, 57)",
      "rgb(6, 4, 4)",
    ],
  ];
  const [state, setState] = useState({
    data: [
      {
        values: [19, 26, 55],
        labels: ["Residential", "Non-Residential", "Utility"],
        type: "pie",
        marker: {
          colors: ultimateColors[0],
        },
      },
    ],
    layout: {
      height: 400,
      width: 400,
      title: "Pie chart",
    },
  });

  return (
    <div>
      <Plot
        data={state.data}
        layout={state.layout}
        onInitialized={(figure) => setState(figure)}
        onUpdate={(figure) => setState(figure)}
      />
    </div>
  );
}
