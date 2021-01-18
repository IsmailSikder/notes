module.exports = app=>{
    const notes = require('../controller/notes.controller')
    
    //Default routes
    app.get('/api', notes.default)
    //Creating a new notes
    app.post('/notes',notes.create)
    
    //Retrive all notes
    app.get('/notes', notes.findAll)

    //Retrive a single note
    app.get('/notes/:noteId', notes.findOne)

    //Update a note
    app.put('/notes/:noteId', notes.update)

    //Delete a note
    app.delete('/notes/:noteId',notes.delete)
    
    return app;
}