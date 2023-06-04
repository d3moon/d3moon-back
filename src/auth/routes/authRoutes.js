const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/oauth2callback', authController.auth);

module.exports = router;