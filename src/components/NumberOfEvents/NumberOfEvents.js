import React, { useState } from "react";
import "./NumberOfEvents.css";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Regular expression to match valid positive integers
    const validNumberPattern = /^[1-9]\d*$/;

    // If user deletes input field, set number of events to 10 and leave input field blank
    if (value === "") {
      setNumber("");
      setNumberOfEvents(10);
      setErrorAlert("");
    }

    // Validate input against the regular expression
    else if (validNumberPattern.test(value)) {
      setNumber(value);
      setNumberOfEvents(parseInt(value, 10));
      setErrorAlert("");
    }

    // Handle invalid input
    else {
      setNumber(value);
      setErrorAlert("Please enter a positive number.");
    }
  };

  return (
    <div id="number-of-events-container">
      <label htmlFor="number-of-events"><h2 id="subheader">Number of events</h2></label>
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
