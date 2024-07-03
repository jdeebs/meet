# Meet App

## Project Overview

The **Meet App** project is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) technique. The application utilizes the Google Calendar API to fetch upcoming events, allowing users to search for events in various cities, view event details, and visualize event data through charts.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Scenarios In Gherkin Syntax](#scenarios-in-gherkin)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Filter Events by City**: Search for and filter events by city.
- **Show/Hide Event Details**: Expand or collapse event details.
- **Specify Number of Events**: Choose the number of events to display.
- **Offline Functionality**: Use the app without an internet connection.
- **Add to Home Screen**: Install the app as a shortcut on your device's home screen.
- **Data Visualization**: View charts that visualize event details, including a scatterplot of event locations and a pie chart of event genres.

## User Stories

   - **As a user**, I should be able to show or hide event details, so that I can quickly view or conceal information based on my needs.

   - **As a user**, I should be able to specify the number of events to display, so that I can manage the amount of information I see at once.

   - **As a user**, I should be able to use the app when offline, so that I can access event information even without an internet connection.

   - **As a user**, I should be able to add an app shortcut to my home screen, so that I can quickly access the app without navigating through my device.

   - **As a user**, I should be able to view charts visualizing event details, so that I can easily understand and analyze event information visually.

## Scenarios In Gherkin Syntax

```
Feature: Show/Hide Event Details

  Scenario: User shows event details
    Given I am on the event list page
    When I click on the "Show Details" button for an event
    Then I should see the details for that event

  Scenario: User hides event details
    Given I have event details visible
    When I click on the "Hide Details" button for that event
    Then I should no longer see the details for that event
```
```
Feature: Specify Number of Events

  Scenario: User specifies the number of events to display
    Given I am on the event list page
    When I select the option to specify the number of events
    And I enter the number of events I want to display
    Then I should see the specified number of events on the page
```
```
Feature: Use the App When Offline

  Scenario: User accesses the app while offline
    Given I am offline
    When I open the app
    Then I should be able to view the event information stored locally
```
```
Feature: Add an App Shortcut to the Home Screen

  Scenario: User adds an app shortcut to the home screen
    Given I am using the app
    When I select the option to add a shortcut to the home screen
    Then I should see the app shortcut on my home screen
    And I should be able to open the app from the home screen shortcut
```
```
Feature: Display Charts Visualizing Event Details

  Scenario: User views charts visualizing event details
    Given I am on the event details page
    When I navigate to the charts section
    Then I should see charts visualizing the event details
```

## Installation

## Usage

## Testing

## Deployment

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features.

## License

This project is licensed under the MIT License.
