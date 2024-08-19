import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch/CitySearch";
import EventList from "./components/EventList/EventList";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import CityEventsChart from "./components/CityEventsChart/CityEventsChart"
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert/Alert";
import { getEvents, extractLocations } from "./api";
import "./App.css";

// hooks 
import { useCheckToken } from "./hooks";


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [events, setEvents] = useState([]);
  // State for current number of events to be displayed
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  // State for selected city to filter events
  const [selectedCity, setSelectedCity] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const checkToken = useCheckToken()
  console.log('checkToken =', checkToken)

  // Hook to fetch data whenever numberOfEvents or selectedCity changes
  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const locations = extractLocations(allEvents);
      setAllLocations(locations);
      const filteredEvents = await getEvents(selectedCity);
      setEvents(filteredEvents.slice(0, numberOfEvents));
    };
    // Display warning message if user is offline
    if (!navigator.onLine) {
      setWarningAlert("You are currently offline. New events will not update until a connection is established.");
    } else {
      setWarningAlert("");
    }

    if(checkToken) {
      fetchData();
    }
  }, [numberOfEvents, selectedCity, checkToken]);

  // Handler function to update the selectedCity state
  const handleCitySelection = async (city) => {
    setSelectedCity(city);
  };


  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <h1 id="title">Meet App</h1>
      <CitySearch
        onCitySelect={handleCitySelection}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventList events={events} />
    </div>
  );
};

export default App;
