const express = require('express')
const elements = express.Router()
const User = require('../models/users.js')

//the home page.
elements.get('/', (req,res) => {
  res.render(
    'home_page/index.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})


module.exports = elements
