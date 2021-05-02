const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

//new session
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser,
  })
})

//create a session
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      res.send('<a href="/">Sorry, no user found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log(req)
        req.session.currentUser = foundUser
        console.log(req)
        res.redirect('/')
      } else {
        res.send('<a href="/">password does not match</a>')
      }
    }
  })
})

//delete a session
sessions.delete('/', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/sessions/loggedout')
  })
})

//inform user they have logged out
sessions.get('/loggedout', (req,res) => {
  res.render(
    'sessions/loggedout'
  )
})
module.exports = sessions
