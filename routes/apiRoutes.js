const router = require("express").Router();
const fs = require("fs");
const notes = require("../db/db.json");
const uuid = require("uuid/v1");

router.get("/api/notes", (req, res) => {
    res.json(results)
});

router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(notes),
        function (error) {
            if (error) throw error;
        }
    );
    res.end();
});

router.delete(`/api/notes/:id`, (req, res) => {
    console.log(req.params.id);
        
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id === id) {
            notes.splice(i, 1);
        }
    }
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
module.exports = router;
