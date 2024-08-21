import { useState, useEffect } from "react";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

// Import SVGs as React components
import { ReactComponent as ReactLogo } from '../../assets/images/react-logo.svg';
import { ReactComponent as JavaScriptLogo } from '../../assets/images/js-logo.svg';
import { ReactComponent as NodeLogo } from '../../assets/images/node-logo.svg';
import { ReactComponent as JQueryLogo } from '../../assets/images/jquery-logo.svg';
import { ReactComponent as AngularLogo } from '../../assets/images/angular-logo.svg';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const [outerRadius, setOuterRadius] = useState(150);

  // Map genres to React components
  const genreLogos = {
    React: <ReactLogo />,
    JavaScript: <JavaScriptLogo />,
    Node: <NodeLogo />,
    jQuery: <JQueryLogo />,
    AngularJS: <AngularLogo />,
  };

  const genres = Object.keys(genreLogos);

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
        // Pass the SVG React component
        svg: genreLogos[genre],
      };
    });
  };

  const getOuterRadius = () => {
    const width = window.innerWidth;
    if (width <= 320) return 40; // for VERY small screens
    if (width <= 480) return 80; // for very small screens
    if (width <= 768) return 100; // for small screens
    if (width <= 1024) return 120; // for medium screens
    return 150; // Default radius for larger screens
  };

  const renderCustomizedLabel = ({ x, y, cx, index, percent }) => {
    // Dynamically set the font size based on screen width
    const width = window.innerWidth;
    let fontSize;

    if (width <= 480) {
      fontSize = "10px"; // Small font for very small screens
    } else if (width <= 550) {
      fontSize = "10px"; // Default font size for larger screens
    } else {
      fontSize = "14px"; // Default font size for larger screens
    }

    // Get the SVG component for the current genre
    const { svg } = data[index];

    return percent ? (
      <g>
        <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
          <div style={{ width: 24, height: 24 }}>{svg}</div>
        </foreignObject>
        <text
          x={x}
          y={y + 15} // Position text below the image
          fill="#fff"
          fontSize={fontSize}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
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
