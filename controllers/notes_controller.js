const express = require('express')
const Note = require('../models/notes.js')
const notes = express.Router()

//NEW Page
notes.get('/new', (req,res) => {
  res.render(
    'notes/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//EDIT Page
notes.get('/:id/edit', (req,res) => {
  Note.findById(req.params.id, (error, foundNote) => {
    res.render(
      'notes/edit.ejs',
      {
        note: foundNote,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE route
notes.delete('/:id', (req,res) => {
  Note.findByIdAndRemove(req.params.id, (error, deletedNote) => {
    res.redirect('/notes')
  })
})

//SHOW Page
notes.get('/:id', (req,res) => {
  Note.findById(req.params.id, (error, foundNote) => {
    res.render(
      'notes/show.ejs',
      {
        note: foundNote,
        currentUser: req.session.currentUser
      }
    )
  })
})

//UPDATE Route
notes.put('/:id', (req,res) => {
  Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedNote) => {
      res.redirect('/notes')
    }
  )
})

//CREATE Route
notes.post('/', (req,res) => {
  Note.create(req.body, (error, createdNote) => {
    res.redirect('/notes')
  })
})

//INDEX Page
notes.get('/', (req,res) => {
  Note.find({}, (error, allNotes) => {
    res.render(
      'notes/index.ejs',
      {
        notes: allNotes,
        currentUser: req.session.currentUser
      }
    )
  })
})

//SEED Route
notes.get('/setup/seed', (req,res) => {
  Note.create(
    [
      {
        name: 'Book Writing Tips',
        link: 'https://www.pinterest.com/rayuchtai01/book-writing-tips/',
        description: 'Little tips to help with writing when stuck or whatever'
      },
      {
        name: 'Survival Tips',
        link: 'https://www.pinterest.com/rayuchtai01/survival-tips/',
        description: 'survival tips if any characters may need it'
      },
      {
        name: 'Interesting Words',
        link: 'https://www.pinterest.com/rayuchtai01/words/',
        description: 'words that can be helpful whenever writing....etc'
      }
    ]
  )
})

module.exports = notes
