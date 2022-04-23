import Plot from "react-plotly.js";

export default function GroupedChart(props) {
    const data = [
        {
          x: Object.values(props.statistics),
          y: Object.keys(props.statistics),
          type: "bar",
          orientation: "h",
        },
      ];
    return (
      <div>
        <Plot data={data} layout={ {width: 400, height: 400, title: 'Ticket by status'} } />
      </div>
  );
}