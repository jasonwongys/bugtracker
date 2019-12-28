const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('../models/user.model');
const Projects = require('../models/project.model');

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
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    }],

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Projects
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Bug',Bug);