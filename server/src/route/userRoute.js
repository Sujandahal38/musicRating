const express = require('express');

const userRouter = express.Router();

const { Signup, login, userData, verifyUsername } = require('../controller/userController');
const { userAuth, verifyToken } = require('../middlewares/userAuth');
const { fetchAllGenre, fetchVideoByGenre, VideoById, fetchVideo } = require('../controller/videoController');
const { AddComment } = require('../controller/commentController');

userRouter.post('/signup', Signup);
userRouter.post('/login', login);
userRouter.get('/userData', userAuth, userData);
userRouter.get('/verifytoken', verifyToken);
userRouter.post('/checkusername', verifyUsername);

userRouter.get('/videos/:limit', fetchAllGenre)
userRouter.get('/videoByGenre/:genre', fetchVideoByGenre);
userRouter.get('/videobyid/:id', VideoById);
userRouter.post('/addcomment',userAuth,AddComment);
userRouter.get('/fetchvideo/:limit', fetchVideo);

module.exports = userRouter;
