import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10) || 32;
    setNumber(value);
    setNumberOfEvents(value);
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