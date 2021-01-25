const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    body: {
        type: String,
        maxlength:10000,
        required:true
    }
});


const Post = mongoose.model('Post', schema);

module.exports = Post;