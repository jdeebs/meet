/**
 * This file contains tests for the EventList component.
 * The EventList component is responsible for rendering a list of event items.
 * These tests check for the presence of key elements and the correct rendering of a given number of events.
 */

import { render } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  // Before each test, render the EventList component and store the result
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    // Expect the EventListComponent to contain an element with role "list"
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    // Fetch all events using the getEvents function
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    // Expect number of list items in component to match the length of the fetched events
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });
});
