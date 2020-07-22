const { token_stem } = require('./helper')

function naiveBayes() {
  if (!(this instanceof naiveBayes)) {
    return new naiveBayes();
  }
  this.token_stem = token_stem;
  this.docs = [];
  this.lastAdded = 0; //index of last document
  this.features = {};
  this.classFeatures = {};
  this.totalExamples = 1;
  this.smoothing = 1;
}

naiveBayes.prototype.addDocument = (doc, label) => {
  if (!this._size(doc)) {
    return;
  }
  if (this._isString(doc)) {
    doc = this.token_stem(doc);
  }
  const docObj = {
    label: label,
    value: doc
  }
  this.docs.push(docObj);
  for (let i = 0; i < doc.length; i++) {
    this.features[doc[i]] = 1;
  }
};
naiveBayes.prototype.addDocuments = function(docs, label) {
  for (var i = 0; i < docs.length; i++) {
    this.addDocument(docs[i], label);
  }
};
naiveBayes.prototype.docToFeatures = function(doc) {
  let features = [];

  if (this._isString(doc)) {
    doc = this.token_stem(doc);
  }

  for (let feature in this.features) {
    features.push(Number(!!~doc.indexOf(feature)));
  }

  return features;
};
naiveBayes.prototype.classify = function(doc) {
  let classifications = this.getClassifications(doc);
  if (!this._size(classifications)) {
    throw 'Not trained';
  }
  return classifications[0].label;
};


naiveBayes.prototype.train = function() {
  var totalDocs = this.docs.length;
  for (var i = this.lastAdded; i < totalDocs; i++) {
    var features = this.docToFeatures(this.docs[i].value);
    this.addExample(features, this.docs[i].label);
    this.lastAdded++;
  }
};