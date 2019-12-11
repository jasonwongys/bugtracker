const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        password: String,
        required: true,
        trim: true,
        minlength: 7
    }
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;