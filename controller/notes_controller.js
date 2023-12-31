const noteService = require('../service/notes_service');

class NotesController {

    async addNote(req, res) {
        const { note, email } = req.body;
        const result = await noteService.addNote(note, email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }


    async addNotes(req, res) {
        const { notes, email } = req.body;

        const result = await noteService.addNotes(notes, email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async deleteNote(req, res) {
        const { note_id, email } = req.body;

        const result = await noteService.deleteNote(note_id, email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async updateNote(req, res) {
        const { note_id, note, email } = req.body;

        const result = await noteService.updateNote(note_id, note, email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async getNotes(req, res) {
        const {email} = req.body;

        const result = await noteService.getNotes(email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
}

module.exports = new NotesController()