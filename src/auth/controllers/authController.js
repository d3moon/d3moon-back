const { oauth2Client } = require('../../config/google');

const auth = async (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI
  });

  res.status(200).json({ auth_url: authorizeUrl });

  const { code } = req.query;

  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
  }
};

module.exports = {
  auth
};
