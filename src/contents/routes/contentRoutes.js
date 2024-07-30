const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/contents/:contentId', contentController.getContent);
router.get('/contents/video/:videoId', contentController.getVideo);

module.exports = router;
