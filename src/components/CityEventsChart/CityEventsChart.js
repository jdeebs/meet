import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);
  const [showXAxisLabels, setShowXAxisLabels] = useState(true);

  useEffect(() => {
    setData(getData());

    const handleResize = () => {
      // Hide x-axis labels if the screen width is below 380px
      setShowXAxisLabels(window.innerWidth > 379);
    };

    // Call handleResize on mount
    handleResize();

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [allLocations, events]);

  // Filter city and event count data for the chart
  const getData = () => {
    return allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    })
    .filter((dataPoint) => dataPoint.count > 0); // Filter out cities with no events
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 40,
          bottom: 60,
          left: 0,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={showXAxisLabels ? { dx: 20, dy: 40, fontSize: 14 } : false}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of events"
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: "#7777cc7d",
            borderRadius: "5px",
            color: "#fff",
            border: "none",
          }}
          itemStyle={{
            color: "#fff", // Text color for the city and number of events
          }}
        />
        <Scatter name="Events" data={data} fill="rgb(119, 119, 204)" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
