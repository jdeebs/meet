import React, { useState } from "react";
import "./NumberOfEvents.css";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumber(value);

    // If user deletes input field, set number of events to 10 and leave input field blank
    if (value === "") {
      setNumber("");
      setNumberOfEvents(10);
    }

    // Validate and set number of events if the input is a valid number
    if (!isNaN(value) && value !== "") {
      setNumberOfEvents(parseInt(value, 10));
    }
  };

  return (
    <div id="number-of-events-container">
      <label htmlFor="number-of-events">Number of Events: </label>
      <input
        type="number"
        id="number-of-events"
        className="number-input"
        value={number}
        onChange={handleInputChange}
        placeholder="32"
        min="0"
        max="32"
        data-testid="number-input"
      />
    </div>
  );
};

export default NumberOfEvents;
