const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [ 'not-started', 'in-progress', 'done' ]
    }
});


const Todo = mongoose.model('Todo', schema);


module.exports = Todo;