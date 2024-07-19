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
  const suggestionsRef = useRef(null);

  // Fetch all events and extract locations when component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      const events = await getEvents();
      const locations = extractLocations(events);
      // Set all locations for future filtering
      setAllLocations(locations);
      // Initially display all locations as suggestions
      setSuggestions(locations);
    };
    fetchSuggestions();
  }, []);

  // Handle clicks outside the input/suggestions container and escape key press
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the textbox and suggestions container
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        // Hide suggestions on escape key press
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

  // Handle changes in the input field
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

  // Handle click on a suggestion
  const handleSuggestionClick = (city) => {
    // Clear input field if "See all cities" is selected
    if (city === "See all cities") {
      setQuery("");
    } else {
      // Set input field to the selected city
      setQuery(city);
    }
    // Clear suggestions
    setSuggestions([]);
    // Hide suggestions
    setShowSuggestions(false);
    // Update events to those with suggested city
    onCitySelect(city);
  };

  return (
    <div id="city-search">
      <h2 id="subheader">Choose your nearest city</h2>
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        ref={inputRef}
        // Show suggestions when input field is focused
        onFocus={() => setShowSuggestions(true)}
        // Update the input value and suggestions on change
        onChange={handleInputChange}
      />
      {/* Conditionally render suggestions list if showSuggestions is true */}
      {showSuggestions && (
        <ul className="suggestions" ref={suggestionsRef}>
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
