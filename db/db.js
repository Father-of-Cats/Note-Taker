const fs = require('fs');
const util = require('util');
const { parse } = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid');

// class constructor for DB

class DB {
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    getNotes = () => {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                parsedNotes = []
            }
            return parsedNotes
        })
    }

    addNote = (notes) => {
        const { title, text } = notes;
        if(!title || !text) {
            throw new Error('You have to have a title and text!')
        }
        const newNote = { title, text, id: uuidv4() };
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote)
    }

    removeNotes = (id) => {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new DB();