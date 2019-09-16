const { Router } = require('express');
const User = require('../models/User');
const getGeoCoordinates = require('../services/formatAddress');
const ensureAuth = require('../middleware/ensure-auth.js');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      city,
      bio
    } = req.body;

    const authId = req.body.sub;
    getGeoCoordinates(city)
      .then(initialCenter => {
        User
        .create({ firstName, lastName, email, lat: initialCenter.lat, lng: initialCenter.lng, city: initialCenter.address, bio, authId })
        .then(user => res.send(user))
        .catch(next);
      })
  })

  .get('/', ensureAuth, (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  });

    getGeoCoordinates(address)
      .then(location => {
        Pin 
          .create({ title, lat: location.lat, lng: location.lng, address: location.address, user, startTime, endTime })
          .then(pin => res.send(pin))
          .catch(next);
      });
  })