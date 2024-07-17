import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch/CitySearch";
import EventList from "./components/EventList/EventList";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import { getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      setEvents(events.slice(0, numberOfEvents));
    };
    fetchData();
  }, [numberOfEvents]);

  const handleCitySelection = async (city) => {
    setSelectedCity(city);
    const filteredEvents = await getEvents(city);
    setEvents(filteredEvents);
  };

  return (
    <div className="App">
      <h1 id="title">Meet App</h1>
      <CitySearch onCitySelect={handleCitySelection} />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
      <EventList events={events} />
    </div>
  );
}

export default App;
