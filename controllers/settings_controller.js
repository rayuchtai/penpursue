const express = require('express')
const Setting = require('../models/settings.js')
const settings = express.Router()

//new route: create a new entry referencing a setting
settings.get('/new', (req,res) => {
  res.render(
    'settings/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//EDIT route: edit an exisiting settings entry
settings.get('/:id/edit', (req,res) => {
  Setting.findById(req.params.id, (error, foundSetting) => {
    res.render(
      'settings/edit.ejs',
      {
        setting: foundSetting,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE route: delete an exisiting entry
settings.delete('/:id', (req,res) => {
  Setting.findByIdAndRemove(req.params.id, (error, deletedSetting) => {
    res.redirect('/settings')
  })
})

//SHOW route: display the settings that have been made
settings.get('/:id', (req,res) => {
  Setting.findById(req.params.id, (error, foundSetting) => {
    res.render(
      'settings/show.ejs',
      {
        setting: foundSetting,
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
      res.redirect('/settings')
    }
  )
})

//CREATE page: Creatine a new setting
settings.post('/', (req,res) => {
  Setting.create(req.body, (error, createdSetting) => {
    res.redirect('/settings')
  })
})

//INDEX route: the page that displays all of the settings created by the user
settings.get('/', (req,res) => {
  Setting.find({}, (error, allSettings) => {
    res.render(
      'settings/index.ejs',
      {
        settings: allSettings,
        currentUser: req.session.currentUser
      }
    )
  })
})

//SEED ROUTE: Populate the settings page.
settings.get('/setup/seed', (req,res) => {
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
    (error, data) => {
      res.redirect('/settings')
    }
  )
})

module.exports = settings
