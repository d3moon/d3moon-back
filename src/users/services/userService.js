const userRepository = require('../repositories/userRepository.js');
const mernService = require('../../config/contents/mern/services/mernService.js');
const paperService = require('../../papers/services/paperService.js');
require('dotenv').config()

const createUser = async (user) => {
  const accessCodeExpiration = new Date();
  accessCodeExpiration.setDate(accessCodeExpiration.getDate() + 7); 
  const code = accessCodeExpiration.toISOString();

  user.access_code = code;
  return userRepository.createUser(user);
};

const signContent = async (id, userId, nameContent) => {
    const contents = await mernService.getContentMern(id);
    const user = await userRepository.getUserById(userId);

   const result = contents.data.items.map((content)=> (
     {
       title: content.snippet.title,
       thumbnails: content.snippet.thumbnails.maxres,
       videoId: content.snippet.resourceId.videoId
    }
    ));


    const papers = await paperService.listPapers()

    
    user.content = {
      name: nameContent,
      badges: [],
      progress: 0,
      videos: result,
      papers: papers
    };

    return userRepository.updateUser(userId, user);
};


const getUserById = async (id) => userRepository.getUserById(id);

const getUsers = async () => userRepository.getUsers();

const updateUser = async (id, body) => userRepository.updateUser(id, body);

const deleteUser = async (id, body) => {
  const user = await userRepository.getUserById(id);
  const finalDate = new Date()

  if(user.access_code <= finalDate){
    return userRepository.deleteUser(id, body);
  } 
}


module.exports = {
  createUser,
  signContent,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};
