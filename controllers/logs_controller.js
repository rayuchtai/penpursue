const express = require('express')
const logs = express.Router()

logs.get('/', (req,res) => {
  res.render('logs/index.ejs')
})


module.exports = logs;
