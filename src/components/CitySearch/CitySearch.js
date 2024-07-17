import { useState, useEffect, useRef } from "react";
import { extractLocations, getEvents } from "../../api";
import "./CitySearch.css";

const CitySearch = ({ onCitySelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [query, setQuery] = useState("");
  // Create a reference for the city search input and suggestions container
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const events = await getEvents();
      const locations = extractLocations(events);
      setAllLocations(locations);
      setSuggestions(locations);
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    // Handle clicks outside the input/suggestions container
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    // Handle the escape key press
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };
    // Add event listeners for mouse clicks and key presses
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Update query state with the input value
    setQuery(value);
    // Update suggestions state with the filtered locations
    setSuggestions(
      allLocations.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
    );
    // Show suggestions when user types
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (city) => {
    // Clear input field when "See all cities" is selected
    if (city === "See all cities") {
      setQuery("");
    } else {
      // Set input field to the selected city
      setQuery(city);
    }
    // Set the suggestions to an empty array
    setSuggestions([]);
    // Hide suggestions when a city is selected
    setShowSuggestions(false);
    // Update events to those with suggested city
    onCitySelect(city);
  };

  return (
    <div id="city-search" ref={inputRef}>
      <h2 id="subheader">Choose your nearest city</h2>
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
