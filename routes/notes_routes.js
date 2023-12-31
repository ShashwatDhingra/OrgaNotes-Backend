const express = require('express');
const router = express.Router();

const noteController = require('../controller/notes_controller');

// Add Note
router.post('/add', noteController.addNote);

// Add All Note
router.post('/add-all', noteController.addNotes);

// Get all notes
router.get('/', noteController.getNotes)

// Update Note
router.put('/update', noteController.updateNote);

// Delet Note
router.delete('/delete', noteController.deleteNote);

module.exports = router;