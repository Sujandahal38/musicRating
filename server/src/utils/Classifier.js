var stemmer = require('./helper');

function naiveBayes() {
  if (!(this instanceof naiveBayes)) {
    return new naiveBayes();
  }
  //initialised
  this.stemmer = stemmer.token_stem;
  this.totalComment = [];
  this.lastAddedComment = 0;
  this.mapping = {};
  this.classMapping = {};
  this.classTotal = {};
  this.totalTrained = 1;
  this.laplaceSmoothing = 1;
}

naiveBayes.prototype.addComment = function (doc, label) {
  let docObj = {
    label: label,
    value: doc,
  };

  this.totalComment.push(docObj);
  for (let i = 0; i < doc.length; i++) {
    this.mapping[doc[i]] = 1;
  }
};

naiveBayes.prototype.addTotalComment = function (docs, label) {
  for (let i = 0; i < docs.length; i++) {
    this.addComment(docs[i], label);
  }
};

//feature mapping
naiveBayes.prototype.docToFeatures = function (doc) {
  let featureMap = [];

  for (let feature in this.mapping) {
    featureMap.push(Number(!!~doc.indexOf(feature)));
  }

  return featureMap;
};

//classify gareko!!highest probability
naiveBayes.prototype.classify = function (doc) {
  let classifications = this.getClassifications(doc);

  return classifications[0].label;
};

naiveBayes.prototype.train = function () {
  let totalDocs = this.totalComment.length;
  for (let i = this.lastAddedComment; i < totalDocs; i++) {
    let features = this.docToFeatures(this.totalComment[i].value);
    this.addTrainData(features, this.totalComment[i].label);
    this.lastAddedComment++;
  }
};

naiveBayes.prototype.addTrainData = function (docFeatures, label) {
  if (!this.classMapping[label]) {
    this.classMapping[label] = {};
    this.classTotal[label] = 1;
  }

  this.totalTrained++;
  if (docFeatures) {
    let i = docFeatures.length;
    this.classTotal[label]++;

    while (i--) {
      if (docFeatures[i]) {
        if (this.classMapping[label][i]) {
          this.classMapping[label][i]++;
        } else {
          this.classMapping[label][i] = 1 + this.laplaceSmoothing;
        }
      }
    }
  } else {
    for (let key in docFeatures) {
      value = docFeatures[key];
      if (this.classMapping[label][value]) {
        this.classMapping[label][value]++;
      } else {
        this.classMapping[label][value] = 1 + this.laplaceSmoothing;
      }
    }
  }
};

//algorithm of Naive Bayes ,algorithm use gareko
naiveBayes.prototype.probabilityOfClass = function (docFeatures, label) {
  let countDocFeature = 0;
  let probability = 0;

  if (docFeatures.length > 0) {
    let i = docFeatures.length;
    while (i--) {
      if (docFeatures[i]) {
        countDocFeature = this.classMapping[label][i] || this.laplaceSmoothing;
        probability += Math.log(countDocFeature / this.classTotal[label]);
      }
    }
  } else {
    for (let key in docFeatures) {
      countDocFeature =
        this.classMapping[label][docFeatures[key]] || this.laplaceSmoothing;
      probability += Math.log(countDocFeature / this.classTotal[label]);
    }
  }

  let featureRatio = this.classTotal[label] / this.totalTrained;
  probability = featureRatio * Math.exp(probability);

  return probability;
};

naiveBayes.prototype.getClassifications = function (doc) {
  let classifier = this;
  let labels = [];

  for (let className in this.classMapping) {
    labels.push({
      label: className,
      value: classifier.probabilityOfClass(this.docToFeatures(doc), className),
    });
  }

  return labels.sort(function (x, y) {
    return y.value - x.value;
  });
};

module.exports = naiveBayes;
