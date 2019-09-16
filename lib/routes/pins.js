const { Router } = require('express');
const Pin = require('../models/Pin');
const getGeoCoordinates = require('../services/formatAddress');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => { 
    const { title, address, user, startTime, endTime } = req.body;
    getGeoCoordinates(address)
      .then(location => {
        Pin 
          .create({ title, lat: location.lat, lng: location.lng, address: location.address, user, startTime, endTime })
          .then(pin => res.send(pin))
          .catch(next);
      });
  })

  .get('/', ensureAuth, (req, res, next) => {
    Pin 
      .find() 
      .then(pins => res.send(pins))
      .catch(next);
  })

  .put('/:id', ensureAuth, (req, res, next) => {
    const {
      endTime
    } = req.body;

    Pin
      .findByIdAndUpdate(req.params.id, { endTime }, { new: true })
      .then(pin => res.send(pin))
      .catch(next); 
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Pin 
      .findByIdAndDelete(req.params.id)
      .then(pin => res.send(pin))
      .catch(next);
  });
