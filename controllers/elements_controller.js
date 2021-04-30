const express = require('express')
const elements = express.Router()

elements.get('/', (req,res) => {
  res.render('home_page/index.ejs')
})


module.exports = elements
