const express = require('express')
const app = express()
const fs = require('fs')
const notes = require('../db/db.json')
const uuid = require('uuid/v1')


app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {

  const newNote = req.body;
  newNote.id = uuid()
  notes.push(newNote)
  fs.writeFile(__dirname+'/../db/db.json', JSON.stringify(notes), function(error) {
      if (error) throw error
  })
  res.end()
});

// Starts the server to begin listening
module.exports = app