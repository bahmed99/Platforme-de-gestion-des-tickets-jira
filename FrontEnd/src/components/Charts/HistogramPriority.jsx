import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function HistogramPriority(props) {
  return (
    <div>
      <Plot
        data={props.statistics}
        layout={{
          width: 812,
          height: 400,
          title: "Ticket by priority and by month",
        }}
      />
    </div>
  );
}