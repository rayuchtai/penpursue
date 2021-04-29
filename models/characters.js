const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
