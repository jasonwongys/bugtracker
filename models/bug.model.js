const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Projects = require('../models/project.model');

let bugSchema = new Schema({
    description: String,
    members: String,
    priority: String,
    completed: Boolean,
    date: Date,

    projects: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    }

});



const Bug = mongoose.model('bug',bugSchema);
module.exports = Bug;