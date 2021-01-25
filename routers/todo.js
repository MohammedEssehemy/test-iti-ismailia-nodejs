const express = require('express');
const Todo = require('../models/todo');

// base path /api/todo

const todoRouter = new express.Router();
todoRouter.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.send({ message: "something went wrong" });
        }
        res.send(todos);
    })
});

todoRouter.post('/', (req, res) => {
    const { title, status } = req.body;
    Todo.create({ title, status }, (err, todo) => {
        if (err) {
            res.statusCode = 422;
            res.send(err);
            return;
        }
        res.statusCode = 201;
        res.send(todo);
    })
})
todoRouter.delete('/');
todoRouter.patch('/:id');
todoRouter.get('/:id');


module.exports = todoRouter;