const express = require('express');

const userRouter = express.Router();

const { Signup, login } = require('../controller/userController');

userRouter.post('/signup', Signup);
userRouter.post('/login', login);

module.exports = userRouter;
