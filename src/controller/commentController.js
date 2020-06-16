const path = require('path');
const csv = require('csvtojson');

exports.analyzeComments = async (req, res, next) => {
  const filePath = path.join(__dirname, '../assets/stopword.csv');
};
