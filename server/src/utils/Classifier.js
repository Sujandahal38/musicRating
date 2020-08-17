var stemmer = require('./helper');

function BayesClassifier() {

if (!(this instanceof BayesClassifier)) {
  return new BayesClassifier();
}

this.stemmer = stemmer.token_stem;


this.docs = [];

this.lastAdded = 0;

this.features = {};


this.classFeatures = {};

this.classTotals = {};

this.totalExamples = 1;

this.smoothing = 1;
}


BayesClassifier.prototype.addDocument =  function(doc, label) {
if (!this._size(doc)) {
  return;
}

var docObj = {
  label: label,
  value: doc
};

this.docs.push(docObj);

for (var i = 0; i < doc.length; i++) {
  this.features[doc[i]] = 1;
}
};


BayesClassifier.prototype.addDocuments = function(docs, label) {
for (var i = 0; i < docs.length; i++) {
  this.addDocument(docs[i], label);
}
};

BayesClassifier.prototype.docToFeatures = function(doc) {
var features = [];

for (var feature in this.features) {
  features.push(Number(!!~doc.indexOf(feature)));
}

return features;
};


BayesClassifier.prototype.classify = function(doc) {
var classifications = this.getClassifications(doc);

if (!this._size(classifications)) {
  throw 'Not trained';
}
return classifications[0].label;
};

BayesClassifier.prototype.train = function() {
var totalDocs = this.docs.length;
for (var i = this.lastAdded; i < totalDocs; i++) {
  var features = this.docToFeatures(this.docs[i].value);
  this.addExample(features, this.docs[i].label);
  this.lastAdded++;
}
};
BayesClassifier.prototype.addExample = function(docFeatures, label) {
if (!this.classFeatures[label]) {
  this.classFeatures[label] = {};
  this.classTotals[label] = 1;
}

this.totalExamples++;

if (Array.isArray(docFeatures)) {
  var i = docFeatures.length;
  this.classTotals[label]++;

  while(i--) {
    if (docFeatures[i]) {
      if (this.classFeatures[label][i]) {
        this.classFeatures[label][i]++;
      } else {
        this.classFeatures[label][i] = 1 + this.smoothing;
      }
    }
  }
} else {
  for (var key in docFeatures) {
    value = docFeatures[key];

    if (this.classFeatures[label][value]) {
      this.classFeatures[label][value]++;
    } else {
      this.classFeatures[label][value] = 1 + this.smoothing;
    }
  }
}
};
BayesClassifier.prototype.probabilityOfClass = function(docFeatures, label) {
var count = 0;
var prob = 0;

if (this._isArray(docFeatures)) {
  var i = docFeatures.length;

  // Iterate though each feature in document.
  while(i--) {
    // Proceed if feature collection.
    if (docFeatures[i]) {
      /*
       * The number of occurances of the document feature in class.
       */
      count = this.classFeatures[label][i] || this.smoothing;

      /* This is the `P(d|c)` part of the model.
       * How often the class occurs. We simply count the relative
       * feature frequencies in the corpus (document body).
       *
       * We divide the count by the total number of features for the class,
       * and add it to the probability total.
       * We're using Natural Logarithm here to prevent Arithmetic Underflow
       * http://en.wikipedia.org/wiki/Arithmetic_underflow
       */
      prob += Math.log(count / this.classTotals[label]);
    }
  }
} else {
  for (var key in docFeatures) {
    count = this.classFeatures[label][docFeatures[key]] || this.smoothing;
    prob += Math.log(count / this.classTotals[label]);
  }
}

/*
 * This is the `P(c)` part of the model.
 *
 * Divide the the total number of features in class by total number of all features.
 */
var featureRatio = (this.classTotals[label] / this.totalExamples);

/**
 * probability of class given document = P(d|c)P(c)
 */
prob = featureRatio * Math.exp(prob);

return prob;
};

/**
* getClassifications
* @desc Return array of document classes their probability values.
* @param {string} doc - document
* @return classification ordered by highest probability.
*/
BayesClassifier.prototype.getClassifications = function(doc) {
var classifier = this;
var labels = [];

for (var className in this.classFeatures) {
  labels.push({
    label: className,
    value: classifier.probabilityOfClass(this.docToFeatures(doc), className)
  });
}

return labels.sort(function(x, y) {
  return y.value - x.value;
});
};

/*
* Helper utils
*/
BayesClassifier.prototype._isString = function(s) {
return typeof(s) === 'string' || s instanceof String;
};

BayesClassifier.prototype._isArray = function(s) {
return Array.isArray(s);
};

BayesClassifier.prototype._isObject = function(s) {
return typeof(s) === 'object' || s instanceof Object;
};

BayesClassifier.prototype._size = function(s) {
if (this._isArray(s) || this._isString(s) || this._isObject(s)) {
  return s.length;
}
return 0;
};

/*
* Export constructor
*/
module.exports = BayesClassifier;