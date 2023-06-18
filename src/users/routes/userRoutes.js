const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//users
router.post('/users', userController.createUser);
router.post('/users/:userId/content', userController.signContent);
router.put('/contents/progress', userController.setContentProgress);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);

module.exports = router;
