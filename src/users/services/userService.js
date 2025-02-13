const userRepository = require('../repositories/userRepository.js');
const contentService = require('../../contents/services/contentService.js');
const paperService = require('../../papers/services/paperService.js');
const schedule = require('node-schedule');

  
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

require('dotenv').config()

const createUser = async (user) => {
  const accessCodeExpiration = new Date();
  accessCodeExpiration.setDate(accessCodeExpiration.getDate() + 7); 
  const code = accessCodeExpiration.toISOString();

  user.access_code = {
    code: Math.random().toString().slice(2, 11),
    date: code
  };
  return userRepository.createUser(user);
};

const signContent = async (id, userId, nameContent) => {
  const contents = await contentService.getContent(id);
  const user = await userRepository.getUserById(userId);

  const result = contents.data.items.map((content) => ({
    title: content.snippet.title,
    thumbnails: content.snippet.thumbnails.maxres,
    videoId: content.snippet.resourceId.videoId,
  }));

  const papers = await paperService.listPapers();

  // Verifica se o conteúdo já foi assinado
  if (user.content && user.content.some((content) => content.name === nameContent)) {
    return 'Você já possui esse treinamento';
  }

  // Adiciona o novo conteúdo ao array de conteúdos do usuário
  const newContent = {
    name: nameContent,
    progress: 0,
    videos: result,
    papers: papers,
    idPlaylist: id,
  };

  if (!user.content) {
    user.content = [];
  }

  user.content.push(newContent);

  console.log(user)

  // Atualiza o usuário no banco de dados
  await userRepository.updateUser(userId, user);
  return user.content;
};

const setContentProgress = async (userId, nameContent) => {
  const user = await userRepository.getUserById(userId);

  const content = user.content.find(contentItem => contentItem.name === nameContent);

  if (content === undefined) {
    return;
  };

  const videos = content.videos.length;
  const watched = 1;

  if(content.progress === 100){
    const storage = getStorage()
    const badgeRef = ref(storage, 'badge/badge.png');

    const url = await getDownloadURL(badgeRef);

    content.badge = url;

    await userRepository.updateUser(userId, user);
    return 100;
  }

  content.progress = content.progress ? parseInt(content.progress, 10) : 0;

  const progress = (watched / videos) * 100;

  content.progress += progress;

  const response = await userRepository.updateUser(userId, user);

  return response;
}


const getUserById = async (id) => userRepository.getUserById(id);

const getUserByCode = async (code) => userRepository.getUserByCode(code);

const getUsers = async () => userRepository.getUsers();

const updateUser = async (id, body) => userRepository.updateUser(id, body);


const deleteUser = async (id, body) => {
  const user = await userRepository.getUserById(id);
  const finalDate = new Date()

  if(user.access_code <= finalDate){
    return userRepository.deleteUser(id, body);
  } 
}

const checkAndDeleteExpiredUsers = async () => {
  const users = await getUsers();

  for (const user of users) {
    await deleteUser(user.id);
  }
}

schedule.scheduleJob('0 0 * * *', checkAndDeleteExpiredUsers);


module.exports = {
  createUser,
  signContent,
  setContentProgress,
  getUserById,
  getUserByCode,
  getUsers,
  updateUser,
  deleteUser
};
