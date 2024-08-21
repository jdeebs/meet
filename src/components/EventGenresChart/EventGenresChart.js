import { useState, useEffect } from "react";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const [outerRadius, setOuterRadius] = useState(150);
  const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];

  useEffect(() => {
    setData(getData());
  }, [events]);

  useEffect(() => {
    const handleResize = () => {
      setOuterRadius(getOuterRadius());
    };

    // Set radius on mount
    setOuterRadius(getOuterRadius());

    // Add resize event listener
    window.addEventListener("resize", handleResize);
    return () => {
      // Clean up event listener on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getData = () => {
    return genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
  };

  const getOuterRadius = () => {
    const width = window.innerWidth;
    if (width <= 480) return 80; // Smaller radius for very small screens
    if (width <= 768) return 100; // Medium radius for small screens
    return 150; // Default radius for larger screens
  };

  const renderCustomizedLabel = ({ x, y, cx, index, percent }) => {
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
