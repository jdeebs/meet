import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  // Before each test, render the Event component and store the result
  let EventComponent;
  let event;
  beforeEach(async () => {
    // Fetch events using getEvents function
    const allEvents = await getEvents();
    // Use the first event from fetched data
    event = allEvents[0];
    // Render Event component with the first mock event
    EventComponent = render(<Event event={event} />);
    
  });
  test("renders event title correctly", () => {
    const { queryByText } = EventComponent;
    // Check if the summary(title) is rendered
    expect(queryByText(event.summary)).toBeInTheDocument();
  });
});
