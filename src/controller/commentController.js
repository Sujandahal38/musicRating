const path = require('path');
const csv = require('csvtojson');
const Video = require('../model/Video');

exports.analyzeComments = async (req, res, next) => {
  const filePath = path.join(__dirname, '../assets/stopword.csv');
};
