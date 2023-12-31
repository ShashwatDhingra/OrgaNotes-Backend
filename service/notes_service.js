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
            return {result: true, message: 'Note Saved.'};
        } catch (e) {
            return {result: false, message: 'Error while saving Note.'};
        }

    }
}

module.exports = new NoteService();