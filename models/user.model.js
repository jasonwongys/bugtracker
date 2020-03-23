const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    
    date: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String
    },
    profileImg: {
        type: String
    },
    
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }],

    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],

});


module.exports = User = mongoose.model("users", UserSchema);