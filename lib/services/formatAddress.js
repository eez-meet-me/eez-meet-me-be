const request = require('superagent');
require('dotenv').config();

const getGeoCoordinates = (address) => {
  return request
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then(res => {
      return (
        {
          lat: res.body.results[0].geometry.location.lat,
          lng: res.body.results[0].geometry.location.lng,
          address: res.body.results[0].formatted_address
        }
      );
    });
};

module.exports = getGeoCoordinates;
