const mongoose = require('mongoose');
// saves a reference to the schema constructor
var Schema = mongoose.Schema;

// note object
var NoteSchema = new Schema ({
    title: String,
    body: String
});

// creates model note schema - using mongoose model method
var Note = mongoose.model('Note', NoteSchema);

// export note model
module.exports = Note;
