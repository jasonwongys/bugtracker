const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;