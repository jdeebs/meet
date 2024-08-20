import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// Import Google APIs client library
import { google } from "googleapis";

// load variables from .env file
dotenv.config();

const corsOptions = {
    origin: "http://localhost:3000",
    method: "GET", post: "POST",
  };

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Initialize calendar API
const calendar = google.calendar("v3");

// Define scope for read-only access to public calendar events
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// Define the redirect URI after OAuth2 authentication
// const redirect_uris = ["https://jdeebs.github.io/meet/"];
const redirect_uris = ["http://localhost:3000/callback"];

// Create new OAuth2 client with given credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirect_uris[0]
);

/**
 * @description - Generates and returns an authentication URL for the user to authorize the app
 */
app.get("/get-auth-url", async function (req, res) {
  // Generate authentication URL with specified access and scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.status(200).json({ authUrl });
});

/**
 * @description - Exchanges the authorization code for an access token and returns it
 * @param {string} code - The authorization code obtained after user consent
 */
app.get("/get-access-token/:code", async function (req, res) {
  const code = decodeURIComponent(req.params.code);
  oAuth2Client.getToken(code, (error, response) => {
    if (error) {
      console.error("Error getting token:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(response);
  });
});

/**
 * @description - Handles the OAuth2 callback and exchanges the authorization code for an access token
 * @param {string} code - The authorization code passed as a query parameter after user consent
 */
app.get("/callback", async function (req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Missing code");
  }

  try {
    const { tokens } = oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.status(200).json(tokens);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Authentication failed");
  }
});

/**
 * @description - Fetches calendar events using the provided access token
 * @param {string} access_token - The access token obtained after successful OAuth2 authentication
 */
app.get("/get-calendar-events/:access_token", async function (req, res) {
  try {
    const access_token = decodeURIComponent(req.params.access_token);
    oAuth2Client.setCredentials({ access_token });
    const results = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
    res.status(200).json({ events: results.data.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port = ${PORT}`);
});
