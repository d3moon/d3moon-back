const mernService = require('../services/mernService')
const userService = require('../../../users/services/userService')

const getContentMern = async (req, res) => {
  const { contentId } = req.params;
  const response = await mernService.getContentMern(contentId)

  if(!response){
    return res.status(404).json({message: 'Content não encontrado!'})
  }

  const playlistItems = response.data.items[0];

  return res.status(200).json(playlistItems)

};

const setContentProgress = async (req, res) => {
  const { userId, nameContent } = req.body;

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({message: 'Usuário não encontrado!'})
  }

  const content = user.content.find(contentItem => contentItem.name === nameContent);

  if (!content) {
    return res.status(404).json({ message: 'Content não encontrado!' });
  }

  const videos = content.videos.length;
  const watched = 1;

  const progress = (watched / videos) * 100;

  user.content = {
    name: nameContent,
    badges: [],
    progress: 0,
    videos: result,
    papers: papers
  };
  
  
  const response = await userService.updateUser(userId, { progress:progress } );

  if (!response) {
    return res.status(404).json({ message: 'Content não atualizado!' });
  }

  return res.status(201).json({message: 'Progresso atualizado com sucesso!'})
};


module.exports = {
  getContentMern, 
  setContentProgress
};
