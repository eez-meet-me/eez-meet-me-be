const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  authId: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
