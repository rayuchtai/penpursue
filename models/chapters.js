const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
  name: String,
  writing: String,
  description: String
})

const Chapter = mongoose.model('Chapter', chapterSchema)

module.exports = Chapter
