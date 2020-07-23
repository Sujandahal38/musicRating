const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  artist: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  embedCode: {
    type: String,
  },
  youtubeComments: {
    type: Array,
  },
  mvdbComments: {
    type: Array,
  },
  ratings: Number,
  genre: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Video', videoSchema);
