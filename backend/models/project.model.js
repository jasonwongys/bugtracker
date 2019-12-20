const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
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
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Project',Project);