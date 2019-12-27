const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bug = new Schema({
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    },
    date: {
        type: Date,
        required: true
    },
    projects: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Bug',Bug);