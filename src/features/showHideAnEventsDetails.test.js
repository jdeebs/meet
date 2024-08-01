import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// loadFeature() expects file path to start from the root of the project
const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("When user clicks on show event details", ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventDOM;
    given("the user is on the event list page", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    when(
      "the user clicks on the show details button for an event",
      async () => {
        // Wait for the event list items to be rendered
        await waitFor(() => {
          const EventListItems = within(EventListDOM).getAllByRole("listitem");
          expect(EventListItems.length).toBeGreaterThan(0);

          // Ensure at least one list item exists
          const firstEventItem = EventListItems[0];
          EventDOM = firstEventItem.querySelector("#event");
          expect(EventDOM).not.toBeNull();

          // Find the show details button within the specific event
          const showDetailsBtn = within(EventDOM).getByRole("button", {
            name: /Show Details/i,
          });
          expect(showDetailsBtn).toBeInTheDocument();

          // Simulate user clicking the show details button
          const user = userEvent.setup();
          user.click(showDetailsBtn);
        });
      }
    );

    then("the user should see the details for that event", async () => {
      // Wait for the details section to become visible
      const EventDetails = await waitFor(() =>
        within(EventDOM).getByTestId("details")
      );
      expect(EventDetails).toBeInTheDocument();
      expect(EventDetails).toBeVisible();

      // Verify the hide details button is now visible
      const hideDetailsBtn = within(EventDOM).getByRole("button", {
        name: /Hide Details/i,
      });

      expect(hideDetailsBtn).toBeInTheDocument();
    });
  });

  test("When user clicks on hide event details", ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventDOM;
    given("the event details are visible", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;

      // Wait for the event list items to be rendered
      await waitFor(async () => {
        EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).getAllByRole("listitem");
        // Select the first list item event
        const firstEventItem = EventListItems[0];
        EventDOM = firstEventItem.querySelector("#event");

        // Find and click on show details button
        const showDetailsBtn = within(EventDOM).getByRole("button", {
          name: /Show Details/i,
        });
        const user = userEvent.setup();
        user.click(showDetailsBtn);

        // Wait for the details section to become visible
        const EventDetails = await waitFor(() =>
          within(EventDOM).getByTestId("details")
        );
        expect(EventDetails).toBeVisible();
      });
    });

    when(
      "the user clicks on the hide details button for that event",
      async () => {
        // Find and click the hide details button
        const hideDetailsBtn = within(EventDOM).getByRole("button", {
          name: /Hide Details/i,
        });
        expect(hideDetailsBtn).toBeInTheDocument();

        const user = userEvent.setup();
        user.click(hideDetailsBtn);
      }
    );

    then(
      "the user should no longer see the details for that event",
      async () => {
        // Wait for the list items to be rendered
        const EventListItems = await waitFor(() => {
          const items = within(EventListDOM).getAllByRole("listitem");
          expect(items.length).toBeGreaterThan(0);
          return items;
        });

        // Select the first list item event
        const firstEventItem = EventListItems[0];
        EventDOM = firstEventItem.querySelector("#event");

        // Wait for the show details button to become visible after hiding details
        await waitFor(() => {
          const showDetailsBtn = within(EventDOM).queryByRole("button", {
            name: /Show Details/i,
          });
          expect(showDetailsBtn).toBeInTheDocument();
        });

        // Check that event details are not visible
        const EventDetails = within(EventDOM).queryByTestId("details");
        expect(EventDetails).toBeNull();
      }
    );
  });
});
