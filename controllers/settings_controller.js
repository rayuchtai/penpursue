const express = require('express')
const Setting = require('../models/settings.js')
const User = require('../models/users.js')
const settings = express.Router()

//new page
settings.get('/new', (req,res) => {
  res.render(
    'settings/new.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'New Settings'
    }
  )
})

//EDIT Page
settings.get('/:id/edit', (req,res) => {
  Setting.findById(req.params.id, (error, foundSetting) => {
    res.render(
      'settings/edit.ejs',
      {
        setting: foundSetting,
        tabTitle: foundSetting.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE route: delete an exisiting entry
settings.delete('/:id', (req,res) => {
  Setting.findByIdAndRemove(req.params.id, (error, deletedSetting) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
      foundUser.settings.id(req.params.id).remove()
      foundUser.save((error, data) => {
        res.redirect('/settings')
      })
    })
  })
})

//SHOW Page
settings.get('/:id', (req,res) => {
  Setting.findById(req.params.id, (error, foundSetting) => {
    res.render(
      'settings/show.ejs',
      {
        setting: foundSetting,
        tabTitle: foundSetting.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//UPDATE route: update an existing seeting entry
settings.put('/:id', (req,res) => {
  Setting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedSetting) => {
      User.findById(req.session.currentUser._id, (error, foundUser) => {
        foundUser.settings.id(req.params.id).remove()
        foundUser.settings.push(updatedSetting)
        foundUser.save((error, data) => {
          res.redirect('/settings')
        })
      })
    }
  )
})

//CREATE Route
settings.post('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    Setting.create(req.body, (error, createdSetting) => {
      foundUser.settings.push(createdSetting)
      foundUser.save((error, data) => {
        res.redirect('/settings')
      })
    })
  })
})

//INDEX route: the page that displays all of the settings created by the user
settings.get('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    res.render(
      'settings/index.ejs',
      {
        settings: foundUser.settings,
        tabTitle: 'The Settings',
        currentUser: req.session.currentUser
      }
    )
  })
})

//SEED ROUTE: Populate the settings page.
settings.get('/setup/seed', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    Setting.create(
      [
        {
          type: 'Integral',
          name: 'Medieval',
          images: 'https://www.pinterest.com/rayuchtai01/medieval/',
          description: 'Think! The Arthurian Times. King Arthur and Merlin stories. That sort of vibes'
        },
        {
          type: 'Backdrop',
          name: 'Beach',
          images: 'https://www.pinterest.com/rayuchtai01/beach/',
          description: "It be a beach. Sand. Salty water.  Sea Creatures."
        }
      ],
      (error, createdSetting) => {
        foundUser.settings.push(createdSetting)
        foundUser.save((error, data) => {
          res.redirect('/settings')
        })
      }
    )
  })
})

module.exports = settings
