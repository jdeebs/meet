import { loadFeature, defineFeature } from "jest-cucumber";

// loadFeature() expects file path to start from the root of the project
const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("When user clicks on show event details", ({ given, when, then }) => {
    given("the user is on the event list page", () => {});

    when("the user clicks on the show details button for an event", () => {});

    then("the user should see the details for that event", () => {});
  });

  test("When user clicks on hide event details", ({ given, when, then }) => {
    given("the event details are visible", () => {});

    when("the user clicks on the hide details button for that event", () => {});

    then("the user should no longer see the details for that event", () => {});
  });
});
