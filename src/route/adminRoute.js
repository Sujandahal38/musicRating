const express = require('express');

const adminRouter = express.Router();

const {
  Signup,
  Login,
  AdminProfile,
  CheckUsername
} = require('../controller/adminController');
const {
  AddVideo,
  youtubeScrape,
  deleteVideo,
  editVideo,
  fetchVideo
} = require('../controller/videoController');
const {
  verifyAdmin,
  adminAuth,
} = require('../middlewares/adminAuth');

adminRouter.post('/signup', Signup);
adminRouter.post('/login', verifyAdmin, Login);
adminRouter.get('/profile', adminAuth, AdminProfile);

adminRouter.post('/checkusername', CheckUsername);

adminRouter.post('/addvideo', adminAuth, AddVideo);
adminRouter.get('/fetchcomment/:id', adminAuth, youtubeScrape);
adminRouter.delete('/deleteVideo/:id', adminAuth, deleteVideo);
adminRouter.patch('/editvideo/:id', adminAuth, editVideo);

adminRouter.get('/fetchvideo/:limit', adminAuth, fetchVideo);


module.exports = adminRouter;
