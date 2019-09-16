const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://steezli.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.API_KEY,
  issuer: 'https://steezli.auth0.com/',
  algorithms: ['RS256']
});
