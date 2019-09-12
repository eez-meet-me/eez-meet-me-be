const { Router } = require('express');
const Pin = require('../models/Pin');

module.exports = Router()
  .post('/', (req, res, next) => { 
    const { title, address, user, startTime, endTime } = req.body;
    Pin 
      .create({ title, address, user, startTime, endTime })
      .then(pin => res.send(pin))
      .catch(next);
  })

  .get('/', (req, res, next) => {
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

  .delete('/:id', (req, res, next) => {
    Pin 
      .findByIdAndDelete(req.params.id)
      .then(pin => res.send(pin))
      .catch(next);
  });

  

