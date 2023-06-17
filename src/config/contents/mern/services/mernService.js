const { youtube, oauth2Client } = require('../../../google');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const getContentMern = async (contentId)=> {

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
  getContentMern
};