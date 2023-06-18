const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController.js');


//badges
router.get('/badges/:userId', badgeController.listBadges);

module.exports = router;
