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

// Check if access token is valid from Google API
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// Fetch the list of all events and filter by suggestion
export const getEvents = async (city) => {
  // Use mockData on local host
  const events = mockData;
  if (window.location.href.startsWith("http://localhost")) {
    if (!city || city === "See all cities") {
      return events;
    }
    return events.filter((event) => event.location === city);
  }

  const token = await getAccessToken();
  if (token) {
    const url =
      "https://tialqn4x0c.execute-api.us-west-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      return result.events;
    } else {
      return null;
    }
  }
};

// Get the access token
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://tialqn4x0c.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
