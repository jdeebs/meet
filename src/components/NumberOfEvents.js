import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Check if the input is empty or not a number
    if (value === "" || isNaN(parseInt(value, 10))) {
      // If empty or NaN, set number to 32
      setNumber(0);
      setNumberOfEvents(0);
    } else {
      // Otherwise, parse the input value
      const parsedValue = parseInt(value, 10);
      setNumber(parsedValue);
      setNumberOfEvents(parsedValue);
    }
  };

  return (
    <div>
      <label htmlFor="number-of-events">Number of Events:</label>
      <input
        type="number"
        id="number-of-events"
        value={number}
        onChange={handleInputChange}
        data-testid="number-input"
      />
    </div>
  );
};

export default NumberOfEvents;
