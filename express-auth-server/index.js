import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// Import Google APIs client library
import { google } from "googleapis";

// load variables from .env file
dotenv.config();

const corsOption = {
  origin: ["*"],
};

const app = express();

app.use(cors(corsOption));
app.use(bodyParser.json());

// Initialize calendar API
const calendar = google.calendar("v3");

// Define scope for read-only access to public calendar events
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// Define the redirect URI after OAuth2 authentication
// const redirect_uris = ["https://jdeebs.github.io/meet/"];
const redirect_uris = ["http://localhost:3000/meet/"];

// Create new OAuth2 client with given credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirect_uris[0]
);

/**
 * @description - to generate and return an authentication URL
 */
app.get("/get-auth-url", async function (req, res) {
  // Generate authentication URL with specified access and scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.status(200).json({ authUrl });
});

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