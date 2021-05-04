const express = require('express')
const User = require('../models/users.js')
const Character = require('../models/characters.js')
const characters = express.Router()

//NEW Page: Add a new Character
characters.get('/new', (req,res) => {
  console.log(req);
  res.render(
    'characters/new.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'New Character'
    }
  )
})

// EDIT page: Edit an existing Characters
characters.get('/:id/edit', (req,res) => {
  Character.findById(req.params.id, (error, foundCharacter) => {
    res.render(
      'characters/edit.ejs',
      {
        character: foundCharacter,
        tabTitle: foundCharacter.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE page: Delete a Character
characters.delete('/:id', (req,res) => {
  Character.findByIdAndRemove(req.params.id, (error, deletedCharacter) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
      foundUser.characters.id(req.params.id).remove()
      foundUser.save((error, data) => {
        res.redirect('/characters')
      })
    })
  })
})

//SHOW page: On the show page, there will be a delete and edit page.
characters.get('/:id', (req,res) => {
  Character.findById(req.params.id, (error, foundCharacter) => {
    res.render(
      'characters/show.ejs',
      {
        character: foundCharacter,
        tabtitle: foundCharacter.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//UPDATE route: Update the chosen character.
characters.put('/:id', (req,res) => {
  Character.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedCharacter) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
      foundUser.characters.id(req.params.id).remove()
      foundUser.characters.push(updatedCharacter)
      foundUser.save((error, data) => {
        res.redirect('/characters')
      })
    })
  })
})

//CREATE route: Creating a new character
characters.post('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    console.log(foundUser);
    Character.create(req.body, (error, createdCharacter) => {
      foundUser.characters.push(createdCharacter)
      foundUser.save((error, data) => {
        res.redirect('/characters')
      })
    })
  })
})

//Index Page: Where the character names are beign displayed
characters.get('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    res.render(
      'characters/index.ejs',
      {
        characters: foundUser.characters,
        tabTitle: 'The Characters',
        currentUser: req.session.currentUser
      }
    )
  })
})

// SEED ROUTE
characters.get('/setup/seed', (req,res) => {
  Character.create(
    [
      {
        type: 'Symbolic',
        name: 'Spencer',
        description: 'This man is a doctor with an unusual love for cheap cherrry lollipops.'
      },
      {
        type: 'Dynamic',
        name: 'Alex',
        description: 'Ambitious kid that rarely thinks of the consequences of his actions. He would scale a tall building and leap between windows, if he wants to enter through the window.'
      },
      {
        type: 'Static',
        name: 'Old Man',
        description: 'This old man likes to walk in the early morning. This old man also likes to listen to the birds when he takes a short break in the park.'
      }
    ],
    (error, data) => {
      res.redirect('/characters')
    }
  )
})

//export these routes
module.exports = characters;
