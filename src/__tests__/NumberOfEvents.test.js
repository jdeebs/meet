import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let inputElement;

  beforeEach(() => {
    // Render the NumberOfEvents component and store getByTestId function
    const { getByTestId } = render(
      <NumberOfEvents setNumberOfEvents={() => {}} setErrorAlert={() => {}} />
    );
    // Assign the input element to inputElement using getByTestId
    inputElement = getByTestId("number-input");
  });

  test("renders NumberOfEvents component", () => {
    expect(inputElement).toBeInTheDocument();
  });

  test("default value of input is 32", () => {
    // Convert inputElement value to string before assertion
    expect(inputElement.value.toString()).toBe("32");
  });

  test("value of input changes when user types in it", async () => {
    // Setup user object, simulating user interaction
    const user = userEvent.setup();
    // Simulate user typing "10" into the inputElement
    await user.type(inputElement, "{backspace}{backspace}10");
    // Check if inputElement now has the value "10" after converting inputElement value to string before assertion
    expect(inputElement.value.toString()).toBe("10");
  });
});
