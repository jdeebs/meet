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
