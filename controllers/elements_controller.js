const express = require('express')
const elements = express.Router()
const User = require('../models/users.js')

//the home page is asking if the user is new member or not?
elements.get('/', (req,res) => {
  res.render(
    'home_page/index.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'The Elements of the Story'
    }
  )
})


module.exports = elements
