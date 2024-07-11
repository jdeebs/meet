/**
 * This file contains tests for the CitySearch component.
 * The CitySearch component is responsible for rendering a text input for users to search for a city.
 * These tests check for the presence of the text input and ensure it has the correct class name for styling.
 */

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";

describe("<CitySearch /> component", () => {
  // Before each test, render the CitySearch component and store the result
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  test("renders text input", () => {
    // Store element containing the textbox role
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    // Expect textbox in the CitySearch component
    expect(cityTextBox).toBeInTheDocument();
    // Expect textbox element to have the class name "city"
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    // Store element containing the list role
    const suggestionList = CitySearchComponent.queryByRole("list");
    // Expect list to not be in the CitySearch component
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    // Setup user object, simulating user interaction
    const user = userEvent.setup();
    // Store element containing the textbox role
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    // Simulate user click on textbox asynchronously
    await user.click(cityTextBox);
    // Initialize list AFTER the click occurs
    const suggestionList = CitySearchComponent.queryByRole("list");
    // Expect list to be in the CitySearch component
    expect(suggestionList).toBeInTheDocument();
    // Expect list element to have the class name "suggestions"
    expect(suggestionList).toHaveClass("suggestions");
  });
});
