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
