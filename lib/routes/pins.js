const { Router } = require('express');
const Pin = require('../models/Pin');
const getGeoCoordinates = require('../services/formatAddress');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => { 
    const { where, message, address, startTime, endTime } = req.body;
    const sub = req.user.sub;

    getGeoCoordinates(address)
      .then(location => {
        Pin 
          .create({ where,
            message,
            lat: location.lat,
            lng: location.lng,
            address: location.address,
            startTime,
            user: sub,
            endTime })
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

  .put('/:id', (req, res, next) => {
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
