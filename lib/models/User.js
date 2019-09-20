const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  authId: {
    type: String,
    required: true
  },
  followers: [{
    type: String
  }]
});


userSchema.statics.getPins = function(authId) {
  return this.aggregate([
    { $match: { authId: authId } },
    { $lookup: { from: 'pins', localField: 'authId', foreignField: 'user', as: 'userPins' } },
    { $unwind: { path: '$followers' } },
    { $lookup: { from: 'pins', localField: 'followers', foreignField: 'user', as: 'followerPins' } },
    { $project: { _id: false, pins: { $concatArrays: ['$userPins', '$followerPins'] } } }
  ]);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
