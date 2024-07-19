/**
 * This file contains tests for the CitySearch component.
 * The CitySearch component is responsible for rendering a text input for users to search for a city.
 * These tests check for the presence of the text input and ensure it has the correct class name for styling.
 */

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

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

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    // Setup user object, simulating user interaction
    const user = userEvent.setup();
    // Store list of all events using getEvents function
    const allEvents = await getEvents();
    // Store all possible locations extracted from allEvents using extractLocations function
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // Simulate user typing "Berlin" in city textbox asynchronously
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // Get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    // Mock onCitySelect function
    const onCitySelect = jest.fn();

    // Render the CitySearch component with the mocked onCitySelect prop
    CitySearchComponent.rerender(<CitySearch onCitySelect={onCitySelect} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Suggestions textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems =
      within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});