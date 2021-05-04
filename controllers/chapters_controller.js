const express = require('express')
const Chapter = require('../models/chapters.js')
const User = require('../models/users.js')
const chapters = express.Router()

//NEW Page
chapters.get('/new', (req,res) => {
  res.render(
    'chapters/new.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'New Chapter'
    }
  )
})

//EDIT Page
chapters.get('/:id/edit', (req,res) => {
  Chapter.findById(req.params.id, (error, foundChapter) => {
    res.render(
      'chapters/edit.ejs',
      {
        chapter: foundChapter,
        tabTitle: foundChapter.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE Route: the abiity to delete an existing entry
chapters.delete('/:id', (req,res) => {
  Chapter.findByIdAndRemove(req.params.id, (error, deletedChapter) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
      foundUser.chapters.id(req.params.id).remove()
      foundUser.save((error, data) => {
        res.redirect('/chapters')
      })
    })
  })
})

//SHOW Page: To display all the chapter entries
chapters.get('/:id', (req,res) => {
  Chapter.findById(req.params.id, (error, foundChapter) => {
    res.render(
      'chapters/show.ejs',
      {
        chapter: foundChapter,
        tabTitle: foundChapter.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//UPDATE route
chapters.put('/:id', (req,res) => {
  Chapter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedChapter) => {
      User.findById(req.session.currentUser._id, (error, foundUser) => {
        foundUser.chapters.id(req.params.id).remove()
        foundUser.chapters.push(updatedChapter)
        foundUser.save((error, data) => {
          res.redirect('/chapters')
        })
      })
    }
  )
})

//CREATE: The power of Creation
chapters.post('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    Chapter.create(req.body, (error, createdChapter) => {
      foundUser.chapters.push(createdChapter)
      foundUser.save((error, data) => {
        res.redirect('/chapters')
      })
    })
  })
})

//INDEX Page: Displays all the chapter names
chapters.get('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    res.render(
      'chapters/index.ejs',
      {
        chapters: foundUser.chapters,
        tabTitle: 'The Chapters',
        currentUser: req.session.currentUser
      }
    )
  })
})

//SEED ROUTE
chapters.get('/setup/seed', (req,res) => {
  Chapter.create(
    [
      {
        name: 'The Consequences of Going on a Hike',
        writing: 'https://docs.google.com/document/d/1wy0IV4-RUpWhLnMTmLGTt7QSQWI-99C9S_tb2v1DRxU/edit?usp=sharing',
        description: 'Idk what will happen but it will be an unusual event that happens to the main character that will give them confusion. Will confuse the main character but it will be an interersting read for the reader.'
      },
      {
        name: 'Got arrested because of Caramel Candy',
        writing: 'https://docs.google.com/document/d/17EOUAYoDcJVVNic2H4zLZQE_kpTVjuIXtykxdSpEm4o/edit?usp=sharing',
        description: 'Just a random title. I just want the caramel candy to have a significant meaning in the chapter. LOL'
      }
    ]
  )
})

module.exports = chapters
