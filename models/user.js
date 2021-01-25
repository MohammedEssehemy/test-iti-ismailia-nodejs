const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


const User = mongoose.model('User', schema);

module.exports = User;