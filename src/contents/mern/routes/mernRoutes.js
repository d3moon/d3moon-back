const express = require('express');
const router = express.Router();
const mernController = require('../controllers/mernController');


//contents
router.get('/contents/mern', mernController.getContentMern);

module.exports = router;
