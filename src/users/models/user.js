const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv4()
  },
  fullname: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  profile_picker: {
    type: String,
    required: true
  },
  access_code: {
    type: String,
    required:true
  },
  content: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
