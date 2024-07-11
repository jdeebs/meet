/**
 * This file contains tests for the App component. 
 * The App component is the main component that renders other sub-components like EventList and CitySearch.
 * These tests check for the presence of key elements to ensure that the App component renders correctly.
 */

import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  // Before each test, Render the App component and store its first child in AppDOM
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    // Expect the AppDOM to contain an element with id "event-list"
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    // Expect the AppDOM to contain an element with id "city-search"
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});
