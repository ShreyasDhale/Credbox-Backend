const { google } = require('googleapis');

const CLIENT_ID = '42824118438-ejdu3mg84ck9j5uq3b089bsoilbhkimk.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04uCmL8EQfmVqCgYIARAAGAQSNwF-L9Ir9n9_GI5XjwrqBCtD0ZhmMyG3YV0eDUh2dP2k3jGs7Chb0ounMIdENpcFy3ZrWmfZ7sM';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = google.drive({ version: 'v3', auth: oauth2Client });