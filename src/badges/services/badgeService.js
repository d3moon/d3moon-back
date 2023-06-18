const userService = require('../../users/services/userService');

const listBadges = async (userId) =>{
  const user = await userService.getUserById(userId);

  const badgesFiltered = user.content.map((b) => b.badge)

  return badgesFiltered
} 

module.exports = { listBadges };