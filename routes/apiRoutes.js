const db = require(`../db/db.json`);
const { uuid } = require(`uuidv4`);
const fs = require("fs");

// const newNotes = require('..data/newNotes');
// const savedNotes = require('..data/savedNotes');

module.exports = (app) => {
    
    app.get("/api/notes", (req, res) => {

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if(err) throw err;
            const notes = JSON.parse(data);
            res.send(data);
        })
        // res.send(db);

    });

    app.post("/api/notes", (req, res) => {
        
        var noteId = uuid();
        console.log(noteId);
        var newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text
        }
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if(err) throw err;
            const allNotes = JSON.parse(data);
            allNotes.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
                if(err) throw err;
                res.send(allNotes);
                console.log("Note Created");
            })
        })

    });

    app.delete("/api/notes/:id", (req, res) => {

        var noteId = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if(err) throw err;
            var allNotes = JSON.parse(data);
            var newNote = allNotes.filter(note => note.id !== noteId);
            fs.writeFile("./db/db.json", JSON.stringify(newNote, null, 2), err => {
                if(err) throw err;
                res.send(newNote);
                console.log("Note Deleted");
            })
        })
    });
}