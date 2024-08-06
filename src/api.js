import mockData from "./mock-data";

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async (selectedCity = "") => {
  let events;
  if (window.location.href.startsWith("http://localhost")) {
    events = mockData;
  } else {
    const token = await getAccessToken();
    if (token) {
      removeQuery();
      const url =
        "https://5qwr4hy2m5.execute-api.us-west-1.amazonaws.com/dev/api/get-events" +
        "/" +
        token;
      const response = await fetch(url);
      const result = await response.json();
      events = result.events;
    }
  }

  if (!events) return [];

  // If a city is selected, filter events by that city
  if (selectedCity && selectedCity !== "See all cities") {
    events = events.filter((event) =>
      event.location.toLowerCase().includes(selectedCity.toLowerCase())
    );
  }

  return events;
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");

      if (!code) {
        const response = await fetch("https://5qwr4hy2m5.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url");
        if (!response.ok) {
          console.error('Failed to fetch auth URL:', response.status, response.statusText);
          throw new Error('Failed to fetch auth URL');
        }

        const result = await response.json();
        const { authUrl } = result;

        window.location.href = authUrl;
        return;
      }

      return code && getToken(code);
    }

    return accessToken;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch(
      "https://5qwr4hy2m5.execute-api.us-west-1.amazonaws.com/dev/api/token" +
        "/" +
        encodeCode
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
};
