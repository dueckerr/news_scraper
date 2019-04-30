const mongoose = require('mongoose');
// saves reference to schema constructor
var Schema = mongoose.Schema;

// article object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // 'note' is an object that stores a note id
    // links to note model
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
     }]
   });

// creates model for article schema
var Article  = mongoose.model('Article', ArticleSchema);

// Export Article Model
module.exports = Article;