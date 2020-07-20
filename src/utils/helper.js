const csvtojson = require('csvtojson');
const path = require('path');
const natural = require('natural');

const stopWordPath = path.join(__dirname, '../assets/stopword.csv');

exports.token_stem = async (comment) => {
  let words = comment.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
  words=words.filter((word)=> word.length>1);
  let stopword = [];
  const stopJson = await csvtojson()
    .fromFile(stopWordPath)
    .then((obj) => {
      obj.map((item) => stopword.push(item.English));
    })
    .catch((err) => console.log(err));
  words = words.filter((word) => {
    return stopword.indexOf(word) == -1;
  });
  const finalWords = [];
  words.map((word) => {
    finalWords.push(natural.PorterStemmer.stem(word));
  });
  return finalWords;
};