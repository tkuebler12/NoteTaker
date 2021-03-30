const newNotes = require('..data/newNotes');
const savedNotes = require('..data/savedNotes');

module.exports = (app) => {
    
    app.get(`/api/newNotes`, (req, res) => res.json(newNotes));

    app.get(`/api/savedNotes`, (req, res) => res.json(savedNotes));

    app.post(`api/newNotes`, (req, res) => {
        
    })
}