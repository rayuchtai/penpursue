const express = require('express')
const Plot = require('../models/plot.js')
const User = require('../models/users.js')
const plots = express.Router()

//NEW: This is a page
plots.get('/new', (req,res) => {
  res.render(
    'plots/new.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'New Plot'
    }
  )
})

//EDIT: This is a page
plots.get('/:id/edit', (req,res) => {
  Plot.findById(req.params.id, (error, foundPlot) => {
    res.render(
      'plots/edit.ejs',
      {
        plot: foundPlot,
        tabTitle: foundPlot.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE: the power of destruction
plots.delete('/:id', (req,res) => {
  Plot.findByIdAndRemove(req.params.id, (error, deletedPlot) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
      foundUser.plots.id(req.params.id).remove()
      foundUser.save((error, data) => {
        res.redirect('/plots')
      })
    })
  })
})

//SHOW page: Displays all the plot entries
plots.get('/:id', (req,res) => {
  Plot.findById(req.params.id, (error, foundPlot) => {
    res.render(
      'plots/show.ejs',
      {
        plot: foundPlot,
        tabTitle: foundPlot.name,
        currentUser: req.session.currentUser
      }
    )
  })
})

//UPDATE route...update the chosen entry
plots.put('/:id', (req,res) => {
  Plot.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true},
    (error, updatedPlot) => {
      User.findById(req.session.currentUser._id, (error, foundUser) => {
        foundUser.plots.id(req.params.id).remove()
        foundUser.plots.push(updatedPlot)
        foundUser.save((error, data) => {
          res.redirect('/plots')
        })
      })
    }
  )
})

//CREATE route: creating a new plot
plots.post('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    Plot.create(req.body, (error, createdPlot) => {
      foundUser.plots.push(createdPlot)
      foundUser.save((error, data) => {
        res.redirect('/plots')
      })
    })
  })
})

//INDEX Page: Where the plot names are being displayed
plots.get('/', (req,res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    res.render(
      'plots/index.ejs',
      {
        plots: foundUser.plots,
        tabTitle: 'The Plots',
        currentUser: req.session.currentUser
      }
    )
  })
})

//SEED ROUTE: populate the page with beginning information
plots.get('/setup/seed', (req,res) => {
  Plot.create(
    [
      {
        type: 'Exposition',
        name: 'Introducing the Story',
        description: 'Probably begin with describing the setting with contradictory information to have the reader be confused but intrigued as to why the description is so odd.'
      },
      {
        type: 'Resolution',
        name: 'How I want the story to end',
        description: '...I don\' know yet but it is a brewing.'
      }
    ]
  )
})

module.exports = plots
