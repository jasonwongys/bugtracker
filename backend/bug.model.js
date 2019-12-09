const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bug = new Schema({
    description: {
        type: String
    },
    assignee: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Bug',Bug);