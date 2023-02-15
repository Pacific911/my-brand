const jwtoken = require('jsonwebtoken');
const User = require('../models/users');
// jwt verification
const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwtoken.verify(token, 'paccy', async (err, decodedtoken) => {
      if (err) {
        next();
      }
      if (decodedtoken) {
        const data = await User.findById(decodedtoken.id);
        if (data) {
          res.locals.user = data;
          next();
        } else {
          next();
        }
      }
    });
  } else {
    next();
  }
};
module.exports = verifyUser;
