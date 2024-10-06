import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch/CitySearch";
import EventList from "./components/EventList/EventList";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import CityEventsChart from "./components/CityEventsChart/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart/EventGenresChart";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert/Alert";
import { getEvents, extractLocations } from "./api";
import "./App.css";

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

  // Hook to fetch data whenever numberOfEvents or selectedCity changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const allEvents = await getEvents();
        if (allEvents.length === 0) {
          setErrorAlert("No events found.");
        } else {
          // Extract locations and filter events
          const locations = extractLocations(allEvents);
          setAllLocations(locations);
          const filteredEvents = await getEvents(selectedCity);
          setEvents(filteredEvents.slice(0, numberOfEvents));
          setErrorAlert("");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorAlert("An error occurred while fetching events.");
      } finally {
        localStorage.setItem("events_fetched", "true");
      }
    };

    // Avoid multiple calls during initial load
    if (navigator.onLine) {
      setWarningAlert("");
      fetchData();
    } else {
      setWarningAlert("You are currently offline.");
    }
  }, [numberOfEvents, selectedCity]);

  // Hook to listen for network status changes (online/offline)
  useEffect(() => {
    const handleOnline = () => setWarningAlert("");
    const handleOffline = () =>
      setWarningAlert(
        "You are currently offline. New events will not update until a connection is established."
      );

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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

      <div className="input-container">
        <h1 id="title">Meet App</h1>
        <CitySearch
          onCitySelect={handleCitySelection}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          setNumberOfEvents={setNumberOfEvents}
          setErrorAlert={setErrorAlert}
        />
      </div>

      <div className="charts-container">
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;
