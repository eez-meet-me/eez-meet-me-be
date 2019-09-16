module.exports = (req, res, next) => {
  req.user = {
    sub: '1234',
    firstName: 'eli',
    lastName: 'nicholson',
    email: 'bob@bob.com',
    city: 'Portland, OR',
    bio: 'this is a bio'
  };
  
  next();
};
