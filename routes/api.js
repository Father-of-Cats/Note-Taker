const router = require('express').Router();
const DB = require('../db/db.js');

router.get('/notes', (req, res) => {
    DB
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
})

router.post('/notes', (req, res) => {
    DB
        .addNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(500).json(err))
})

router.delete('/notes/:id', (req, res) => {
    DB
        .removeNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

// export
module.exports = router;
