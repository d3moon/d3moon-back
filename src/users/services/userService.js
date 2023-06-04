const userRepository = require('../repositories/userRepository.js');

const createUser = async (user) => {
  const accessCodeExpiration = new Date();
  accessCodeExpiration.setDate(accessCodeExpiration.getDate() + 7); 
  const code = accessCodeExpiration.toISOString();

  user.access_code = code;
  return userRepository.createUser(user);
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
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};
