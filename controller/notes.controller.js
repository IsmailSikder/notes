
const Note = require('../model/notes.models');

exports.default =(req,res)=>{
    res.json({
        status:"WORKING",
        message: "This is the api route for notes"
    })
}

// Create and Save a new Note
exports.create = (req, res) => {
    var note = new Note
    note.title = req.body.title
    note.content = req.body.content
    
    if(note.title===undefined || note.content===undefined || note.title==='' || note.content===''){
        return res.status(204).json({
            message:"Could not save undefine or no content"
        })
    }

   // console.log(note.title)
    note.save(err=>{
        if(err){
           return res.status(500).json({
                message: "Could not save "+req.body.title
            })
        }
       
        res.status(202).json({
            message:'Notes saved',
            data:note
        })
    })
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    //Note.get has error why??
    //retrieving all the notes
    Note.find((err,note)=>{
        if(note.length===0){
           return res.status(404).json({
                message:"No notes found"
            })
        }
        if(err){
           return res.status(500).json({
                message:"Could no retrieve notes"
            })
        }
        res.status(200).json({
            message:"Retrieve successfully",
            data:note
        })
    })
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findOne({_id:req.params.noteId}, (err,note)=>{
        if(!note){
            return res.status(404).json({
                message: "Note not found with id " + req.params.noteId
            })
        }
        if(err){
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        }
        res.status(200).json({
            message:"retrieve successful",
            data:note
        })
    })
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let note={}
    note.title = req.body.title
    note.content = req.body.content
    
    if(note.title==='' && note.content===''){
        return res.status(204).json({
            message:"No content to update"
        })
    }
    Note.findByIdAndUpdate({_id:req.params.noteId}, note, (err,notes)=>{
        if(!notes) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
      
        if(err){
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        }
        res.status(200).json({
            message:"Updated successfully",
            data:note
        })
       
    })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};