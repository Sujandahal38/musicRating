const path = require('path');
const Video = require('../model/Video');

exports.analyzeComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkVideo = await Video.findOne({ _id: id});
    if (checkVideo) {
      res.json({
        data: checkVideo
      })
    }
  } catch (error) {
    console.log(error)
  }
};
