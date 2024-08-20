import mockData from "./mock-data";
import NProgress from "nprogress";

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck?.error) {
      localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (!code) {
        const response = await fetch(
          // "https://wd44hpn7b3.execute-api.us-west-1.amazonaws.com/dev/get-auth-url"
          "http://localhost:8000/get-auth-url"
        );
        if (!response.ok) {
          console.error(
            "Failed to fetch auth URL:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch auth URL");
        }
        const result = await response.json();
        const { authUrl } = result;
        return (window.location.href = authUrl);
      }
      return code && getToken(code);
    }
    return accessToken;
  } catch (error) {
    console.error("Error in getAccessToken:", error);
    throw error;
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      // "https://wd44hpn7b3.execute-api.us-west-1.amazonaws.com/dev/token" +
      //   "/" +
      //   encodeCode
      "http://localhost:8000/get-access-token/" + encodeCode
    );
    if (!response.ok) {
      // Parse the response as JSON
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, ${errorData.message}`
      );
    }
    const { access_token } = await response.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }
    return access_token;
  } catch (error) {
    console.error("Error in getToken:", error.message);
    throw error;
  }
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
// export const getEvents = async (selectedCity = "") => {
//   let events = [];
//   NProgress.start();

//   try {
//     // Check if app is running locally
//     if (window.location.href.startsWith("http://localhost")) {
//       // in dev mode we are going in here
//       events = mockData;
//     } else if (!navigator.onLine) { // Handle when the user is offline
//       const storedEvents = localStorage.getItem("lastEvents");
//       events = storedEvents ? JSON.parse(storedEvents) : [];
//     } else { // Handle when the user is online
//       const token = await getAccessToken();

//       console.log('token =', token)

//       if (token) {
//         removeQuery();
//         const url = `http://localhost:8000/get-calendar-events/${token}`;
//           // "https://wd44hpn7b3.execute-api.us-west-1.amazonaws.com/dev/get-events" +
//           // "/" +
//           // token;
//         const response = await fetch(url);
//         if (!response.ok) {
//           console.error(
//             "Failed to fetch events:",
//             response.status,
//             response.statusText
//           );
//           throw new Error("Failed to fetch events");
//         }
//         const result = await response.json();
//         // Extract events from the response and store in local storage
//         events = result.events;
//         localStorage.setItem("lastEvents", JSON.stringify(events));
//       }
//     }

//   } catch (error) {
//     console.error("Error in getEvents:", error.message);
//     // If error, set events to an empty array
//     events = [];
//   } finally {
//     // Ensure progress bar is always ended
//     NProgress.done();
//   }

//   // If a city is selected, filter events by that city
//   if (selectedCity && selectedCity !== "See all cities") {
//     events = events.filter((event) =>
//       event.location.toLowerCase().includes(selectedCity.toLowerCase())
//     );
//   }
//   // Return filtered or unfiltered events
//   return events;
// };
export const getEvents = async (selectedCity = "") => {
  let events = [];
  NProgress.start();

  try {
    // Check if app is running locally
    if (window.location.href.startsWith("http://localhost")) {
      const token = await getAccessToken(); // Ensure token is available

      if (token) {
        const url = `http://localhost:8000/get-calendar-events/${token}`; // Fetch events from local server
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            "Failed to fetch events:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch events");
        }
        const result = await response.json();
        events = result.events;
        localStorage.setItem("lastEvents", JSON.stringify(events)); // Store events in local storage
      }
    } else if (!navigator.onLine) {
      // Handle when the user is offline
      const storedEvents = localStorage.getItem("lastEvents");
      events = storedEvents ? JSON.parse(storedEvents) : [];
    } else {
      // Handle when the user is online and not in dev mode
      const token = await getAccessToken();

      if (token) {
        removeQuery();
        const url = `https://wd44hpn7b3.execute-api.us-west-1.amazonaws.com/dev/get-events/${token}`;
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            "Failed to fetch events:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch events");
        }
        const result = await response.json();
        events = result.events;
        localStorage.setItem("lastEvents", JSON.stringify(events));
      }
    }
  } catch (error) {
    console.error("Error in getEvents:", error.message);
    events = [];
  } finally {
    NProgress.done();
  }

  if (selectedCity && selectedCity !== "See all cities") {
    events = events.filter((event) =>
      event.location.toLowerCase().includes(selectedCity.toLowerCase())
    );
  }
  return events;
};