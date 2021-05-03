const express = require('express')
const elements = express.Router()
const User = require('../models/users.js')

//the home page.
elements.get('/', (req,res) => {
  res.render(
    'users/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})


module.exports = elements
