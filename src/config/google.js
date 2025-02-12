require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const TOKEN_PATH = path.join(__dirname, 'token.json');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const loadSavedToken = () => {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oauth2Client.setCredentials(token);
    console.log('✅ Token carregado do arquivo');
  } else {
    console.log('⚠️ Nenhum token salvo encontrado.');
  }
};

loadSavedToken(); // Carregar o token ao iniciar

const apiKey = process.env.ADDITIONAL_API_KEY;

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client, // Agora usando oauth2Client autenticado
});

module.exports = {
  oauth2Client,
  youtube
};
