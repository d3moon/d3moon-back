const { youtube, oauth2Client } = require('../../config/google');
require('dotenv').config()

const getContent = async (contentId)=> {

  try {
    const response = await youtube.playlistItems.list({
      auth: oauth2Client,
      part: 'snippet',
      playlistId: contentId,
      maxResults: 50,
      mine: true
    });
  
      return response;
  } catch (error) {
    console.log(error)
  }
};

const getVideo = async (videoId) => {
  try {
    const response = await youtube.videos.list({
      auth: oauth2Client,
      part: 'snippet,contentDetails,statistics',
      id: videoId
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  getContent,
  getVideo
};