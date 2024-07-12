import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Filter locations based on the input value
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    // Update query state with the input value
    setQuery(value);
    // Update suggestions state with the filtered locations
    setSuggestions(filteredLocations);
  };

  return (
    // Main container for the City Search component
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        // Show suggestions when input field is focused
        onFocus={() => setShowSuggestions(true)}
        // Update the input value and suggestions on change
        onChange={handleInputChanged}
      />
      {/* Conditionally render suggestions list if showSuggestions is true */}
      {showSuggestions ? (
        <ul className="suggestions">
          {/* Map through suggestions and render each as a list item */}
          {suggestions.map((suggestion) => {
            return <li key={suggestion}>{suggestion}</li>;
          })}
          {/* Add a special list item to see all cities */}
          <li key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
