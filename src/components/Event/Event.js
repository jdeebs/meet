import React, { useState } from "react";
import "./Event.css";

const Event = ({ event }) => {
  // State to track if the event details are shown
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ul id="event">
      <h2>{event && event.summary}</h2>
      <p>{event && event.location}</p>
      <p>{event && new Date(event.created).toUTCString()}</p>
      <button
        id="show-details"
        onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails ? (
        <p className="details">
          {event && event.description}
        </p>
      ) : null}
    </ul>
  );
};

export default Event;
