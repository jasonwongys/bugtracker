const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Bug = require('../models/bug.model');

let projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date
    },
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: 'bug'
    }]
    // users: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Users'
    // }],
}, {
    timestamps: true,
});

const Project = mongoose.model('project',projectSchema);
module.exports = Project;