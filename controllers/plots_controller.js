const express = require('express')
const Plot = require('../models/plot.js')
const plots = express.Router()

//NEW: new page to add a new plot entry
plots.get('/new', (req,res) => {
  res.render(
    'plots/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//EDIT: edit page to edit an existing plot entry
plots.get('/:id/edit', (req,res) => {
  Plot.findById(req.params.id, (error, foundPlot) => {
    res.render(
      'plots/edit.ejs',
      {
        plot: foundPlot,
        currentUser: req.session.currentUser
      }
    )
  })
})

//DELETE: the delete route to delete the thang
plots.delete('/:id', (req,res) => {
  Plot.findByIdAndRemove(req.params.id, (error, deletedPlot) => {
    res.redirect('/plots')
  })
})

//SHOW page: Displays all the plot entries
plots.get('/:id', (req,res) => {
  Plot.findById(req.params.id, (error, foundPlot) => {
    res.render(
      'plots/show.ejs',
      {
        plot: foundPlot,
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
      res.redirect('/plots')
    }
  )
})

//CREATE route: creating a new plot
plots.post('/', (req,res) => {
  Plot.create(req.body, (error, createdPlot) => {
    res.redirect('/plots')
  })
})

//INDEX Page: Where the plot names are being displayed
plots.get('/', (req,res) => {
  Plot.find({}, (error, allPlots) => {
    res.render(
      'plots/index.ejs',
      {
        plots: allPlots,
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
