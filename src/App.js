import React from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import "./App.css";

function App() {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
      <EventList />
    </div>
  );
}

export default App;
