const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Projects = require('../models/project.model');

let bugSchema = new Schema({
    description: String,
    assignee:String,
    priority: String,
    completed: Boolean,
    date: Date,

    projects: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    }
}, {
    timestamps: true,
});



const Bug = mongoose.model('bug',bugSchema);
module.exports = Bug;