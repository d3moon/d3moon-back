const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController.js');


//users
router.get('/papers', paperController.listPapers);
router.get('/papers/download/:name', paperController.downloadPapers);

module.exports = router;
