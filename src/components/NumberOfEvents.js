import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  // State to track number of events shown, initialize to 32
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
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
      />
    </div>
  );
};

export default NumberOfEvents;
