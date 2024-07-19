/**
 * This file contains tests for the App component.
 * The App component is the main component that renders other sub-components like EventList and CitySearch.
 * These tests check for the presence of key elements to ensure that the App component renders correctly.
 */

import React from "react";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
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

  test("render NumberOfEvents", () => {
    // Expect the AppDOM to contain an element with id "number-of-events"
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Find the CitySearch component and its input field
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    // Simulate typing "Berlin" into the CitySearch input field
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    // Find and click on the "Berlin, Germany" suggestion
    await user.click(berlinSuggestionItem);

    // Find the EventList component
    const EventListDOM = AppDOM.querySelector("#event-list");
    // Get all rendered event items from the EventList
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    // Fetch all events and filter for those in "Berlin, Germany"
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    // Check that the number of rendered events matches the number of events for Berlin
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    // Check that each rendered event includes "Berlin, Germany"
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});
