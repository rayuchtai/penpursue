const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  type: String,
  name: String,
  images: String,
  description: String,
})

const Setting = mongoose.model('Setting', settingSchema)

module.exports = Setting
