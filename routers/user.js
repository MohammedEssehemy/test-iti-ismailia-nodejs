const express= require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticationMiddleware = require('../middlewares/authentication');

const userRouter = new express.Router();

// base path /api/user

userRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 7);
        const user = await User.create({ username, password: hash });
        res.statusCode = 201;
        res.send(user);
    } catch (err) {
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
});



userRouter.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username }).exec(); 
        if(!user) throw new Error("wrong username or password");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("wrong username or password");
        // res.json({ profile: user });
        // generate token & send to user
        const token = jwt.sign({ id: user.id }, 'my-signing-secret');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.statusCode = 422;
        res.json({success: false, message: err.message});
    }
});



userRouter.use(authenticationMiddleware)

userRouter.get('/profile' , async (req, res) => {
    const user = await User.findOne({ _id: req.signedData.id }, { password: 0 });
    res.send(user);
})



// userRouter.get('/profile', async (req, res) => {
//     try {
//         const { authorization } = req.headers;
//         const signedData = jwt.verify(authorization, 'my-signing-secret');
//         const user = await User.findOne({ _id: signedData.id }, { password: 0 });
//         res.send(user);
//     } catch (err) {
//         console.error(err);
//         res.statusCode = 401;
//         res.json({ success: false, message: "Authentication failed" });
//     }
// })


userRouter.get('/my-inbox', (req, res) => {

})


module.exports = userRouter;