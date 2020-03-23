const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Bug = require('../models/bug.model');

let projectSchema = new Schema({
    projectName:String,
    description: String,
    members: String,
    dateCreated: Date,
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: 'Bug'
    }]
    
});

const Project = mongoose.model('project',projectSchema);
module.exports = Project;