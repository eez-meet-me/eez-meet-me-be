const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      nickname,
      email,
      sub
    } = req.user;

    User.find({ authId: sub })
      .then(user => {
        if(!user.length) {
          User
            .create({
              name: nickname,
              email,
              authId: sub })
            .then(newUser => res.send(newUser))
            .catch(next);
        }
        else {
          res.send(user);
        }
      })
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/followers', ensureAuth, (req, res, next) => {
    const sub = req.user.sub;
    
    User
      .find({ authId: sub })
      .then(user => {
        console.log(user);
        return Promise.all(
          user[0].followers.map((authId) => {
            return User.findOne({ authId });
          })
        );
      })
      .then(followers => {
        res.send(followers);
      })
      .catch(next);
  })

  .patch('/followers', ensureAuth, (req, res, next) => {
    const {
      email
    } = req.body;

    const sub = req.user.sub;

    User
      .find({ email: email })
      .then(follower => {
        if(follower) {
          User
            .findOneAndUpdate({ authId: sub }, { $addToSet: { followers: follower[0].authId } }, { new: true })
            .then(updatedUser => {
              res.send(updatedUser);
            })
            .catch(next);
        } else {
          throw 'no follower with that email';
        }
      });
  });
