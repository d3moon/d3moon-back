const contentService = require('../services/contentService')

const getContent = async (req, res) => {
  const { contentId } = req.params;
  const response = await contentService.getContent(contentId);

  if (!response) {
    return res.status(404).json({ message: 'Conteúdo não encontrado!' });
  }

  // Aqui pegamos todos os itens da playlist, em vez de apenas o primeiro
  const playlistItems = response.data.items;

  return res.status(200).json(playlistItems);
};


const getVideo = async (req, res) => {
  console.log(req.params);
  const { videoId } = req.params;
  try {
    const response = await contentService.getVideo(videoId);

    if (!response.data.items.length) {
      return res.status(404).json({ message: 'Vídeo não encontrado!' });
    }

    const video = response.data.items[0];
    console.log(video);
    return res.status(200).json(video);
  } catch (error) {
    console.error('Erro ao buscar o vídeo:', error);
    return res.status(500).json({ message: 'Erro ao buscar o vídeo' });
  }
};


module.exports = {
  getContent, 
  getVideo
 };
