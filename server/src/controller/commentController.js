const path = require('path');
const Video = require('../model/Video');
const NaiveBayes = require('../utils/Classifier');
const { tokenAndStemDoc } = require('../utils/helper');
const fs = require('fs');
const readLine = require('readline');
const { json } = require('express');
const User = require('../model/User');

exports.analyzeComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkVideo = await Video.findOne({ _id: id });
    if (checkVideo) {
        const { youtubeComments, mvdbComments } = checkVideo;
        const mvdb_comments = [];
        mvdbComments.map((item) => {
          mvdb_comments.push(item.comment);
        });
        const jsonPath = path.join(__dirname, '../assets/comments.json');
        const jsonFile = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(jsonFile);
        const positiveComments = [];
        const negativeComments = [];
        const comments = [...mvdb_comments];
        const positivePath = path.join(__dirname, '../assets/positiveDoc.txt');
        const negativePath = path.join(__dirname, '../assets/negativeDoc.txt');
        fs.readFileSync(positivePath, 'utf8')
          .split(/\r?\n/)
          .forEach(function (line) {
            positiveComments.push(line);
          });
        fs.readFileSync(negativePath, 'utf8')
          .split(/\r?\n/)
          .forEach(function (line) {
            negativeComments.push(line);
          });
        const Classifier = new NaiveBayes();
        const { positiveDoc, negativeDoc } = await tokenAndStemDoc(
          positiveComments,
          negativeComments,
        );
        Classifier.addTotalComment(positiveDoc, 'positive');
        Classifier.addTotalComment(negativeDoc, 'negative');

        Classifier.train();
        let positiveCount = 0;
        for (comment of comments) {
          const value = Classifier.classify(comment);
          if (value === 'positive') {
            positiveCount++;
          }
        }
        console.log(positiveCount, comments.length);
        const rating = (positiveCount / comments.length) * 5;
        console.log('here',rating);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createCommentsCsv = async (req, res, next) => {
  try {
    const allVideos = await Video.find();
    if (allVideos) {
      let positiveComments = [];
      let negativeComments = [];
      allVideos.map(
        (video) =>
          comments.push(video.youtubeComments,video.mvdbComments)
      );
      const csvWritePath = path.join(
        __dirname,
        '../assets/datasets/comments.json',
      );
      const csvStream = await fs.createWriteStream(csvWritePath, {
        flags: 'a',
      });
      if (csvStream) {
        const obj = {
          comments: comments,
        };
        await csvStream.write(JSON.stringify(obj));
      }

      csvStream.end();
    }
  } catch (error) {
    console.log(error);
  }
};

exports.AddComment = async (req, res, next) => {
  try {
    const { id, comment } = req.body;
    console.log(req.body);
    const { _id } = req.userInfo;

    const findVideo = await Video.findOne({_id: id});
    if (!findVideo) {
      res.status(404).json({
        message: 'video not found.'
      });
    }
    if (findVideo) {
      const findUser = await User.findOne({_id});
      if (findUser) {
        const commentInfo = {
          _id: findUser._id,
          commentedBy: findUser.fullName,
          comment
        }
        const addComment = await Video.updateOne({_id: id}, {
          $push : {
            mvdbComments: commentInfo
          }
        })
        console.log(addComment);
        if (addComment.nModified > 0) {
          res.status(200).json({
            message: 'commented successfully',
          });
        }
        if (addComment.nModified === 0){
          res.status(500).json({
            message: 'something went wrong.'
          })
        }
      }
    }
  } catch (error) {
      next(error);
  }
}
