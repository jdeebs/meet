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
    if (width <= 320) return 40; // Smallest radius for very small screens
    if (width <= 480) return 80; // Smaller radius for very small screens
    if (width <= 768) return 100; // Medium radius for small screens
    if (width <= 1024) return 120; // Larger radius for medium screens
    return 150; // Default radius for larger screens
  };

  const renderCustomizedLabel = ({ x, y, cx, index, percent }) => {
    // Dynamically set the font size based on screen width
    const width = window.innerWidth;
    let fontSize;

    if (width <= 480) {
      fontSize = "10px"; // Small font for very small screens
    } else if (width <=550) {
      fontSize = "10px"; // Default font size for larger screens
    } else {
      fontSize = "14px"; // Default font size for larger screens
    }

    return percent ? (
      <text
        x={x}
        y={y}
        fill="rgb(119, 119, 204)"
        fontSize={fontSize}
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
          fill="rgb(119, 119, 204)"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
