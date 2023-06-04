const mongoose = require('mongoose');
require('dotenv').config()

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conexão com MongoDB realizada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
  }
};

module.exports = connectDatabase;
