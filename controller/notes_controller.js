const noteService = require('../service/notes_service');

class NotesController{

    async addNote (req, res){
        const {note, email} = req.body;
        const result = await noteService(note, email);

        if(result.status){
            res.status(200).json(result);
        }else{
            res.status(400).json(result);
        }
    }
}   

module.exports = new NotesController()