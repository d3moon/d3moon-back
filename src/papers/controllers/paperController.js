require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const { initializeApp } = require('firebase/app');
const { getStorage, getDownloadURL, ref } = require('firebase/storage');
const fetch = require('node-fetch');
const paperService = require('../services/paperService');

initializeApp(firebaseConfig);

const downloadPapers = async (req, res) => {
  try {
    const fileName = req.params.name;
    const storage = getStorage();
    const fileRef = ref(storage, `mern/${fileName}`);

    const url = await getDownloadURL(fileRef);
    const response = await fetch(url);
    const blob = await response.buffer();

    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }

    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.setHeader('Content-Length', response.headers.get('Content-Length'));
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`); // Força o download
    return res.status(response.status).send(blob);
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao baixar o arquivo.' });
  }
};


const listPapers = async (req, res) => {
  try {
    const result = await paperService.listPapers();
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao listar os arquivos.' });
  }
};

module.exports = {
  downloadPapers,
  listPapers
};
