import mockData from "./mock-data";

/**
 *
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  // Map through the events array to extract the location of each event
  const extractedLocations = events.map((event) => event.location);
  // Create a Set from the extracted locations to remove duplicates
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// Fetch the list of all events and filter by suggestion
export const getEvents = async (city) => {
  const events = mockData;
  if (!city || city === "See all cities") {
    return events;
  }
  return events.filter((event) => event.location === city);
};