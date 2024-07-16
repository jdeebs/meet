import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Filter locations based on the input value
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];
    // Update query state with the input value
    setQuery(value);
    // Update suggestions state with the filtered locations
    setSuggestions(filteredLocations);
    // Show suggestions when input changes
    setShowSuggestions(true);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    // Update query state with the clicked suggestions value
    setQuery(value);
    // Hide the suggestions list
    setShowSuggestions(false);
  };

  return (
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
      {showSuggestions && (
        <ul className="suggestions">
          {/* Map through suggestions and render each as a list item */}
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          {/* Add a special list item to see all cities */}
          <li onClick={handleItemClicked} key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;