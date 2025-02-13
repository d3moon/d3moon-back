const User = require('../models/user');
const mongoose = require('mongoose');

const createUser = async (user) => {
  return await User.create(user);
};

const getUserById = async (id) => {
  return await User.findOne({ id });
};

const getUserByCode = async (code) => {
  return await User.findOne({ 'access_code.code': code });
};

const getUsers = async () => {
  return await User.find();
};

const updateUser = async (id, body) => {
  return await User.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true });
};

const deleteUser = async (id, body) => {
  return await User.findOneAndDelete(id, body);
};

module.exports = {
  createUser,
  getUserById,
  getUserByCode,
  getUsers,
  updateUser,
  deleteUser
};
