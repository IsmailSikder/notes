const mongoose = require('mongoose')

const notesSchema = mongoose.Schema(
    {
        title: String,
        content: String,
    },
    {
        timestamps: true 
    }
)

//var Notes = 

module.exports = mongoose.model('notes',notesSchema)