import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("User specifies the number of events to display", ({
    given,
    when,
    and,
    then,
  }) => {
    given("the user is on the event list page", () => {});

    when(
      "the user selects the option to specify the number of events",
      () => {}
    );

    and("the user enters the number of events they want to display", () => {});

    then(
      "the user should see the specified number of events displayed",
      () => {}
    );
  });
});
