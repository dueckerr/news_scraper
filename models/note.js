const mongoose = require('mongoose');
// saves a reference to the schema constructor
var Schema = mongoose.Schema;

// note object
var NoteSchema = new Schema({
    body: {
        type: String
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

// creates model note schema - using mongoose model method
var Note = mongoose.model('Note', NoteSchema);

// export note model
module.exports = Note;
