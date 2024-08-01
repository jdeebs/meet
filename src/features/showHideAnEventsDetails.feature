Feature: Show/hide event details

    Scenario: When user clicks on show event details
        Given the user is on the event list page
        When the user clicks on the show details button for an event
        Then the user should see the details for that event

    Scenario: When user clicks on hide event details
        Given the event details are visible
        When the user clicks on the hide details button for that event
        Then the user should no longer see the details for that event