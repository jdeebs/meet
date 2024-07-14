import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let inputElement;

  beforeEach(() => {
    const { getByRole } = render(
      <NumberOfEvents setNumberOfEvents={() => {}} />
    );
    /**
     * This line extracts the getByRole function from the object returned by render and assigns it to a constant variable inputElement, allowing getByRole to be used directly in tests without needing to reference the entire NumberOfEvents object
     */
    inputElement = getByRole("textbox");
  });

  test("renders NumberOfEvents component", () => {
    expect(inputElement).toBeInTheDocument();
  });

  test("default value of input is 32", () => {
    expect(inputElement).toHaveValue("32");
  });

  test("value of input changes when user types in it", async () => {
    await userEvent.type(inputElement, "10");
    expect(inputElement).toHaveValue("10");
  });
});
