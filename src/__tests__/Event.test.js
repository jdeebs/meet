import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let event, EventComponent, queryByText;

  beforeEach(async () => {
    // Fetch events using getEvents function
    const allEvents = await getEvents();
    // Use the first event from fetched data
    event = allEvents[0];
    // Render Event component with the first mock event
    EventComponent = render(<Event event={event} />);
    /**
     * This line extracts the queryByText function from the object returned by render and assigns it to a constant variable queryByText, allowing queryByText to be used directly in tests without needing to reference the entire EventComponent object
     */
    queryByText = EventComponent.queryByText;
  });

  test("renders event title correctly", () => {
    // Check if the summary(title) is rendered
    expect(queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event start time correctly", () => {
    // Check if start time is rendered
    expect(queryByText(event.created)).toBeInTheDocument();
  });

  test("renders event location correctly", () => {
    // Check if location is rendered
    expect(queryByText(event.location)).toBeInTheDocument();
  });

  test("renders show details button", () => {
    // Check if Show Details button is rendered
    expect(queryByText("Show Details")).toBeInTheDocument();
  });
});
