import { loadFeature, defineFeature } from "jest-cucumber";

// loadFeature() expects file path to start from the root of the project
const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    when("the user opens the app", () => {});

    then("the user should see the list of upcoming events", () => {});
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {});

    when("user starts typing in the city textbox", () => {});

    then(
      "the user should recieve a list of cities (suggestions) that match what they’ve typed",
      () => {}
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    given("user was typing “Berlin” in the city textbox", () => {});

    and("the list of suggested cities is showing", () => {});

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      () => {}
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {}
    );

    and(
      "the user should receive a list of upcoming events in that city",
      () => {}
    );
  });
});
