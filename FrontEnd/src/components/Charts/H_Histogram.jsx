import Plot from "react-plotly.js";

export default function GroupedChart() {
    const data = [
        {
          x: [4, 5, 6, 1, 4],
          y: ["Comedy", "Action", "Romance", "Drama", "Scifi"],
          type: "bar",
          orientation: "h",
        },
      ];
    return (
      <div>
        <Plot data={data} layout={ {width: 400, height: 400, title: 'Electronics Prices 2016/2017'} } />
      </div>
  );
}