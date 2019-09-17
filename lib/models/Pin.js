const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  where: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user: {
    type: String
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const Pin = mongoose.model('pin', pinSchema);

module.exports = Pin;
