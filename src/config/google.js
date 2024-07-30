require('dotenv').config()
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI

);

const apiKey = process.env.API_KEY;

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});


module.exports = {
  oauth2Client,
  youtube
};