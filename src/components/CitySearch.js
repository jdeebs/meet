import { useState, useEffect } from "react";
import { extractLocations, getEvents } from "../api";

const CitySearch = ({ onCitySelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const events = await getEvents();
      const locations = extractLocations(events);
      setSuggestions(locations);
    };
    fetchSuggestions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Update query state with the input value
    setQuery(value);
    // Show suggestions when input changes
    setShowSuggestions(true);
    // Update suggestions state with the filtered locations
    setSuggestions(
      suggestions.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (city) => {
    // Update query state with the clicked suggestions value
    setQuery(city);
    // Hide the suggestions list
    setShowSuggestions(false);
    // Update events to those with suggested city
    onCitySelect(city);
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
        onChange={handleInputChange}
      />
      {/* Conditionally render suggestions list if showSuggestions is true */}
      {showSuggestions && (
        <ul className="suggestions">
          {/* Map through suggestions and render each as a list item */}
          {suggestions.map((city) => (
            <li key={city} onClick={() => handleSuggestionClick(city)}>
              {city}
            </li>
          ))}
          {/* Add a special list item to see all cities */}
          <li onClick={() => handleSuggestionClick("See all cities")}>
            See all cities
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
