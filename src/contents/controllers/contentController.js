const contentService = require('../services/contentService')

const getContent = async (req, res) => {
  const { contentId } = req.params;
  const response = await contentService.getContent(contentId)

  if(!response){
    return res.status(404).json({message: 'Content não encontrado!'})
  }

  const playlistItems = response.data.items[0];

  return res.status(200).json(playlistItems)

};


module.exports = {
  getContent, 
 };
