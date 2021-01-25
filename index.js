const express = require('express');
require('./db-connection');
const todoRouter = require('./routers/todo');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// error handling
// validation
// authentication && authorization

app.use('/api/todo', todoRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
});