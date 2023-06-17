const express = require('express');
const router = express.Router();
const mernController = require('../controllers/mernController');


//contents
router.get('/contents/:contentId', mernController.getContentMern);
router.put('/contents/progress', mernController.setContentProgress);

module.exports = router;
