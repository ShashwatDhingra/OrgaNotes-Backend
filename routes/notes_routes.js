const express = require('express');
const router = express.Router();

const noteController = require('../controller/notes_controller');

// Add Note
router.post('/add', noteController.addNote);

module.exports = router;