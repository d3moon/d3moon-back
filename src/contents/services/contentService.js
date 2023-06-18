const { youtube, oauth2Client } = require('../../config/google');
require('dotenv').config()

const getContent = async (contentId)=> {

  const response = await youtube.playlistItems.list({
    auth: oauth2Client,
    part: 'snippet',
    playlistId: contentId,
    maxResults: 50,
    mine: true
  });


  return response;
};




module.exports = {
  getContent
};