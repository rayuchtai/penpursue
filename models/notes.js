const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  name: String,
  link: String,
  description: String
})

const Note = mongoose.model('Note', notesSchema)

module.exports = Note
