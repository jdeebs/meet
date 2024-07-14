import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  // State to track number of events shown, initialize to 32
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    // Extract current value of the input field
    const value = event.target.value;
    // Update local state number with new value and re-render component
    setNumber(value);
    // Pass new value as a prop to parent component
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
        data-testid="number-input" // Add data-testid for testing
      />
    </div>
  );
};

export default NumberOfEvents;
