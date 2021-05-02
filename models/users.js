//to be able to use the mongoose methods
const mongoose = require('mongoose')

//require the schemas:
const Chapter = require('./chapters.js')
const Character = require('./characters.js')
const Note = require('./notes.js')
const Plot = require('./plot.js')
const Setting = require('./settings.js')

//user schema utilizing the other schemas: shema with a schema inside:
const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  chapters: [Chapter.schema],
  characters: [Character.schema],
  notes: [Note.schema],
  plots: [Plot.schema],
  settings: [Setting.schema]
})

//create the User Constructor Function:
const User = mongoose.model('User', userSchema)

//
module.exports = User
