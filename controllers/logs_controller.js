const express = require('express')
const logs = express.Router()

logs.get('/', (req,res) => {
  res.render('home_page/index.ejs')
})


module.exports = logs;
