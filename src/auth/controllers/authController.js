const fs = require('fs');
const path = require('path');
const { oauth2Client } = require('../../config/google');

const TOKEN_PATH = path.join(__dirname, '../../config/token.json');

const auth = async (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI
  });

  res.status(200).send({ auth_url: authorizeUrl });

  const { code } = req.query;

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Salvar o token em um arquivo JSON
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('✅ Token salvo com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao obter o token:', error);
    }
  }
};

module.exports = {
  auth
};
  