const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');


//contents
router.get('/contents/:contentId', contentController.getContent);

module.exports = router;
