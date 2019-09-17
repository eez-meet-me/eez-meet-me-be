const { Router } = require('express');
const User = require('../models/User');
// const getGeoCoordinates = require('../services/formatAddress');
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
  });
