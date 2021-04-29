const mongoose = require('mongoose')

const plotSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String
})

const Plot = mongoose.model('Plot', plotSchema)

module.exports = Plot
