/**
 * This file contains tests for the EventList component. 
 * The EventList component is responsible for rendering a list of event items.
 * These tests check for the presence of key elements and the correct rendering of a given number of events.
 */

import { render } from "@testing-library/react";
import EventList from "../components/EventList";

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

  test("renders correct number of events", () => {
    // Rerender the EventList component with a mock array of event objects
    EventListComponent.rerender(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
    // Expect the EventListComponent to contain exactly 4 elements with the "listitem" role
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});
