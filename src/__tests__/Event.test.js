import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
    test("renders event title correctly", () => {
        // Select first event from the mock data
        const mockEvent = mockData[0];
        // Render Event component with the mock event
        const { queryByText } = render(<Event event={mockEvent} />);

        // Check if the summary(title) is rendered
        expect(queryByText(mockEvent.summary)).toBeInTheDocument();
    })
});