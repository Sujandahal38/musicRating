const express = require('express');

const adminRouter = express.Router();

const {
  Signup,
  Login,
  AdminProfile,
  CheckUsername,
  changeAuthorization,
  adminData,
} = require('../controller/adminController');
const {
  AddVideo,
  youtubeScrape,
  deleteVideo,
  editVideo,
  fetchVideo,
  VideoById,
  searchVideo,
} = require('../controller/videoController');
const {
  verifyAdmin,
  adminAuth,
} = require('../middlewares/adminAuth');

const { analyzeComments } = require('../controller/commentController')

adminRouter.post('/signup', Signup);
adminRouter.post('/login', verifyAdmin, Login);
adminRouter.get('/profile', adminAuth, AdminProfile);

adminRouter.post('/checkusername', CheckUsername);

adminRouter.post('/addvideo', adminAuth, AddVideo);
adminRouter.get('/fetchcomment/:id', adminAuth, youtubeScrape);
adminRouter.delete('/deleteVideo/:id', adminAuth, deleteVideo);
adminRouter.patch('/editvideo/:id', adminAuth, editVideo);

adminRouter.get('/fetchvideo/:limit', adminAuth, fetchVideo);

adminRouter.get('/videobyid/:id', adminAuth, VideoById);
adminRouter.get('/search/:text', adminAuth, searchVideo);

adminRouter.patch('/changeauth', adminAuth, changeAuthorization);
adminRouter.get('/fetchadmin', adminAuth, adminData);

adminRouter.get('/analyze', analyzeComments);

module.exports = adminRouter;
