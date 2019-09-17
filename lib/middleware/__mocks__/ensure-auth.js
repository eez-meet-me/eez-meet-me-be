module.exports = (req, res, next) => {
  req.user = {
    sub: '1234',
    nickname: 'bob@bob.com',
    email: 'bob@bob.com'
  };
  
  next();
};
