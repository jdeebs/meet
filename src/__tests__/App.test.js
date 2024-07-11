import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  // Before each test, Render the App component and store its first child in AppDOM
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    // Expect the AppDOM to contain an element with id "event-list"
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    // Expect the AppDOM to contain an element with id "city-search"
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});
