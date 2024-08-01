import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("User specifies the number of events to display", ({
    given,
    when,
    and,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let NumberOfEventsDOM;
    let NumberInput;
    given("the user is on the main page", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      expect(AppDOM).toBeInTheDocument();
    });

    when(
      "the user selects the option to specify the number of events",
      async () => {
        // Select the number of events container
        NumberOfEventsDOM = AppDOM.querySelector("#number-of-events-container");
        expect(NumberOfEventsDOM).toBeInTheDocument();

        // Select the number of events input
        NumberInput = within(NumberOfEventsDOM).getByTestId("number-input");
        expect(NumberInput).toBeInTheDocument();

        // Simulate user clicking number of events input
        const user = userEvent.setup();
        await user.click(NumberInput);
        expect(NumberInput).toHaveFocus();
      }
    );

    and(
      "the user enters the number of events they want to display",
      async () => {
        // Simulate user typing a number into the input
        const user = userEvent.setup();
        await user.clear(NumberInput); // Clear existing value
        await user.type(NumberInput, "10");

        // Verify that the input value is as expected
        expect(NumberInput.value.toString()).toBe("10");
      }
    );

    then(
      "the user should see the specified number of events displayed",
      async () => {
        // Select event list element
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(async () => {
          // Find all list items within the event list parent element
          const EventListItems = within(EventListDOM).getAllByRole("listitem");

          // Check the number of list items matches user input value
          expect(EventListItems.length).toBe(NumberInput.valueAsNumber);
        });
      }
    );
  });
});
