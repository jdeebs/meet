import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event/Event";
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
    expect(queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event start time correctly", () => {
    expect(queryByText(event.created)).toBeInTheDocument();
  });

  test("renders event location correctly", () => {
    expect(queryByText(event.location)).toBeInTheDocument();
  });

  test("renders 'Show Details' button", () => {
    expect(queryByText("Show Details")).toBeInTheDocument();
  });

  test("initially hides event details and renders 'Show Details' button", () => {
    expect(queryByText("Event Details")).not.toBeInTheDocument();
    expect(queryByText("Show Details")).toBeInTheDocument();
  });

  test("renders event details and 'Hide Details' button when 'Show Details' is clicked", async () => {
    // Setup user object, simulating user interaction
    const user = userEvent.setup();

    // Store button element containing the "Show Details" text
    const showDetailsButton = EventComponent.queryByText("Show Details");

    // Simulate user click on button asynchronously
    await user.click(showDetailsButton);

    // Check for presence of event details and the 'Hide Details' button
    expect(queryByText("Event Details")).toBeInTheDocument();
    expect(queryByText("Hide Details")).toBeInTheDocument();
  });

  test("hides event details and renders 'Show Details' button when 'Hide Details' button is clicked", async () => {
    // Setup user object, simulating user interaction
    const user = userEvent.setup();

    // Store button elements containing the "Show Details" and "Hide Details" text
    const showDetailsButton = EventComponent.queryByText("Show Details");
    const hideDetailsButton = EventComponent.queryByText("Hide Details");

    // Simulate user click on buttons asynchronously
    await user.click(showDetailsButton);
    await user.click(hideDetailsButton);

    // Check for presence of 'Show Details' button
    expect(queryByText("Event Details")).not.toBeInTheDocument();
    expect(queryByText("Show Details")).toBeInTheDocument();
  });
});
