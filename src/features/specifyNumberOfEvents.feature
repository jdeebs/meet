Feature: Specify number of events

    Scenario: User specifies the number of events to display
        Given the user is on the main page
        When the user selects the option to specify the number of events
        And the user enters the number of events they want to display
        Then the user should see the specified number of events displayed