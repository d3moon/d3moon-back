const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');


//users
router.post('/notes', notesController.createNote);
router.get('/notes', notesController.getNotes);
router.get('/notes/:id', notesController.getNoteById);
router.put('/notes/:id', notesController.updateNote);

module.exports = router;
