import React, { useState } from "react";
import "./Event.css";

const Event = ({ event }) => {
  // State to track if the event details are shown
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle the visibility of event details
  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <ul id="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button id="show-details" onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && <p>Event Details</p>}
    </ul>
  );
};

export default Event;
