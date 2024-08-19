import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
// Import Google APIs client library
// const { google } = require("googleapis");
import { google } from 'googleapis'



// load variables from .env file
dotenv.config()

const corsOption = {
  origin: ['*']
}

const app = express()

app.use(cors(corsOption))
app.use(bodyParser.json())


// Initialize calendar API
const calendar = google.calendar("v3");

// Define scope for read-only access to public calendar events
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// Destructure environment variables for client credentials and calendar ID
// const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
// Define the redirect URI after OAuth2 authentication
// const redirect_uris = ["https://jdeebs.github.io/meet/"];
const redirect_uris = ['http://localhost:3000/meet/']

// Create new OAuth2 client with given credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirect_uris[0]
);

app.get('/ping', function(req, res) {
  res.send("pong")
})

/**
 * @description - to generate and return an authentication URL
 */
app.get("/get-auth-url", async function(req, res) {
    // Generate authentication URL with specified access and scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.status(200).send({
    authUrl
  })
})

app.get("/get-access-token", async function(req, res) {

})

app.listen(process.env.PORT, function() {
   console.log('server running at port = ', process.env.PORT)
})


// module.exports.getAccessToken = async (event) => {
//   // Decode authorization code extracted from the URL query
//   const code = decodeURIComponent(`${event.pathParameters.code}`);

//   return new Promise((resolve, reject) => {
//     /**
//      *  Exchange authorization code for access token with a “callback” after the exchange,
//      *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
//      */
//     oAuth2Client.getToken(code, (error, response) => {
//       if (error) {
//         console.error("Error getting token:", error);
//         return reject(error);
//       }
//       return resolve(response);
//     });
//   })
//     .then((results) => {
//       // Respond with OAuth token
//       return {
//         statusCode: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           // "Access-Control-Allow-Credentials": "true",
//         },
//         body: JSON.stringify(results),
//       };
//     })
//     .catch((error) => {
//       // Handle error
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: error.message }),
//       };
//     });
// };


