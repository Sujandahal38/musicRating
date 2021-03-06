var BayesClassifier = require('./Classifier');
var classifier = new BayesClassifier();

var positiveDocuments = [
  'I love tacos., awesome.',
  'Dude, that burrito was epic!',
  'Holy cow, these nachos are so good and tasty.',
  'I am drooling over the awesome bean and cheese quesadillas.',
  'torta is good.'
];

var negativeDocuments = [
  'Gross, worst taco ever.',
  'The buritos gave me horrible diarrhea.',
  'I\'m going to puke if I eat another bad nacho.',
  'I\'d rather die than eat those nasty enchiladas.'
];

classifier.addDocuments(positiveDocuments, 'positive');
classifier.addDocuments(negativeDocuments, 'negative');

classifier.train();

console.log(classifier.classify('I heard the mexican restaurant is great!')); // "positive"
console.log(classifier.classify('I don\'t want to eat there again.')); // "negative"
console.log(classifier.classify('The torta is epicly bad.')); // "negative"
console.log(classifier.classify('awesome.'));