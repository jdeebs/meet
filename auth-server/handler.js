"use strict";

// Import Google APIs client library
const { google } = require("googleapis");
// Initialize calendar API
const calendar = google.calendar("v3");
// Define scope for read-only access to public calendar events
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// Destructure environment variables for client credentials and calendar ID
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
// Define the redirect URI after OAuth2 authentication
const redirect_uris = ["https://jdeebs.github.io/meet/"];

// Create new OAuth2 client with given credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Export getAuthURL function from Node.js to generate and return an authentication URL
module.exports.getAuthURL = async () => {
  // Generate authentication URL with specified access and scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  // Return authentication URL in response body with appropriate headers
  return {
    statusCode: 200,
    headers: {
      // Allow request from any origin
      "Access-Control-Allow-Origin": "*",
      // Allow credentials in requests
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      // Return generated authentication URL
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  // Decode 'events' parameter from URL path
  const events = decodeURIComponent(`${event.pathParameters.events}`);

  return new Promise((resolve, reject) => {
    /**
     * Exchange the 'events' parameter for calendar events with a callback function
     */
    oAuth2Client.getCalendarEvents(events, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with calendar events data
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
