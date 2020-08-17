const csvtojson = require('csvtojson');
const path = require('path');
const natural = require('natural');

const stopWordPath = path.join(__dirname, '../assets/stopword.csv');

const token_stem = async (comment) => {
  let words = comment.split(' ');
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
 for (word of words) {
   const stemWord = await natural.PorterStemmer.stem(word);
   finalWords.push(stemWord);
 }
  return finalWords;
};

exports.tokenAndStemDoc = async (positive, negative) => {
  const finalPositiveDoc = [];
    for (comment of positive) {
      let stem = await token_stem(comment);
      finalPositiveDoc.push(stem)
    }
    let finalNegativeDoc = [];
    console.log(negative);

    for (comment of negative) {
      let stem = await token_stem(comment);
      finalNegativeDoc.push(stem)
    }
    let finalObj = {
      positiveDoc : finalPositiveDoc,
      negativeDoc : finalNegativeDoc
    }
    return finalObj;
}
