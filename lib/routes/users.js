const { Router } = require('express');
const User = require('../models/User');
// const getGeoCoordinates = require('../services/formatAddress');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log(req.body, 'body');
    console.log(req.user, 'user');
    const {
      firstName,
      lastName,
      email,
      city,
      bio,
      sub
    } = req.user;

    User
      .create({
        firstName,
        lastName,
        email,
        city,
        bio,
        authId: sub })
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  });
