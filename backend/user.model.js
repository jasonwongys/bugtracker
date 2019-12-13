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
        required: true,
        trim: true,
        minlength: 7
    },
    email: {
        type: String,
        required: true,
        trime: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

userSchema.methids.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;