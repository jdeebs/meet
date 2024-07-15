import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      setEvents(events.slice(0, numberOfEvents));
      setLocations(extractLocations(events));
    };
    fetchData();
  }, [numberOfEvents]);

  return (
    <div className="App">
      <h1 id="title">Meet App</h1>
      <p id="subheading">Choose your nearest city</p>
      <CitySearch allLocations={locations} />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
      <EventList events={events} />
    </div>
  );
}

export default App;
