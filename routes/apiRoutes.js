const express = require("express");
const app = express();
const fs = require("fs");
const notes = require("../db/db.json");
const uuid = require("uuid/v1");

app.get("/api/notes", (req, res) => {
    res.json(notes)
});

app.post("/api/notes", (req, res) => {
    //req.body is the note I want to save
    const newNote = req.body;
    //uuid for adding id. universally unique identifier
    newNote.id = uuid();
    //add new note to file
    notes.push(newNote);
    //the note is written to the local file system because no database
    fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(notes),
        function (error) {
            if (error) throw error;
        }
    );
    res.end();
});

app.delete(`/api/notes/:id`, (req, res) => {
    //needed to define id
    const id = req.params.id
    console.log(id);
        
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id === id) {
            notes.splice(i, 1);
        }
    }
    //allowing me to have multiple notes without a database
    fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(notes),
        function (error) {
            if (error) throw error;
        }
    );
    res.end();
});

// Starts the server to begin listening
module.exports = app;
