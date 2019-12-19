const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    description: {
        type: String,
        required: true
    },
    members: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    completed: {
        type: Date,
        required: true
    },
    dateCreated: {
        type: Date
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Project',Project);