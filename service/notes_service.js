const { noteSchema, userModel } = require('../model/user_model')

class NoteService {
    async addNote(note, email) {
        let user = await userModel.findOne({ email });

        if (!user) {
            return { result: false, message: 'Uesr not found.' }
        }

        user.notes.push(note);

        try {
            await user.save();
            return { result: true, message: 'Note Saved.' };
        } catch (e) {
            return { result: false, message: 'Error while saving Note.' };
        }

    }

    async addNotes(notes, email) {
        let user = await userModel.findOne({ email });

        if (!user) {
            return { result: false, message: 'Uesr not found.' }
        }

        // Validate that notes is an array
        if (!Array.isArray(notes)) {
            return { result: false, message: "Invalid notes format" };
        }

        // Clear the existing notes array for the user
        user.notes = [];

        // Add the received notes to the user's notes array
        user.notes = notes;

        try {
            await user.save();
            return { result: true, message: 'Note Saved.' };
        } catch (e) {
            return { result: false, message: 'Error while saving Note.' };
        }
    }

    async deleteNote(note_id, email) {
        let user = await userModel.findOne({ email });

        if (!user) {
            return { result: false, message: 'Uesr not found.' }
        }

        const result = await user.updateOne(
            { email },
            { $pull: { notes: { id: note_id } } }
        );

        if (result.nModified > 0) {
            return { result: true, message: 'Note deleted successfully.' };
        } else {
            return { result: false, message: 'Note not found.' };
        }
    }

    async updateNote(note_id, note, email) {
        let user = await userModel.findOne({ email });

        if (!user) {
            return { result: false, message: 'Uesr not found.' }
        }

        const result = await user.updateOne(
            { email, 'notes.id': note_id },
            { $set: { 'note.$': note } }
        )

        if (result.nModified > 0) {
            return { result: true, message: 'Note deleted successfully.' };
        } else {
            return { result: false, message: 'Note not found.' };
        }
    }

    async getNotes(email) {
        try {
            let user = await userModel.findOne({ email });

            if (!user) {
                return { result: false, message: 'Uesr not found.' }
            }

            const notes = user.notes;

            return { result: true, notes };
        } catch (e) {
            return { result: false, message: "Error while fetching notes." }
        }
    }

}

module.exports = new NoteService();