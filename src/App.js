import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch/CitySearch";
import EventList from "./components/EventList/EventList";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import { getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  // State for current number of events to be displayed
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  // State for selected city to filter events
  const [selectedCity, setSelectedCity] = useState("");

  // Hook to fetch data whenever numberOfEvents or selectedCity changes
  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents(selectedCity);
      setEvents(events.slice(0, numberOfEvents));
    };
    fetchData();
  }, [numberOfEvents, selectedCity]);

  // Handler function to update the selectedCity state
  const handleCitySelection = async (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <h1 id="title">Meet App</h1>
      <CitySearch onCitySelect={handleCitySelection} />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
      <EventList events={events} />
    </div>
  );
};

export default App;
