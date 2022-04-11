import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function Pie(props) {
  const [state, setState] = useState({
    data: [
      {
        values: Object.values(props.statistics),
        labels: Object.keys(props.statistics),
        type: "pie",
        
      },
    ],
    layout: {
      height: 400,
      width: 400,
      title: "Nombre total de tickets par type",
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
