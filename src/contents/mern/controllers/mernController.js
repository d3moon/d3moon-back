const { youtube, oauth2Client } = require('../../../config/google');
require('dotenv').config()

const getContentMern = async (req, res) => {
  const playlistId = process.env.MERN_CONTENT;

  const response = await youtube.playlistItems.list({
    auth: oauth2Client,
    part: 'snippet',
    playlistId: playlistId,
    maxResults: 50,
  });

  const playlistItems = response.data.items;
  return res.status(200).json({playlistItems})

};

module.exports = {
  getContentMern
};
