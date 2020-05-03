const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar : String,
  username: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminType: {
    type: String,
  },
  resetToken: String,
  resetTokenExpiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Admin', adminSchema);
