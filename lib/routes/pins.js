const { Router } = require('express');
const Pin = require('../models/Pin');
const User = require('../models/User');
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
    const sub = req.user.sub;

    User 
      .getPins(sub)
      .then(pins => {
        if(pins && pins.length) {
          res.send(pins[0].pins);
        } else {
          throw 'No pins to get';
        }
      })
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
