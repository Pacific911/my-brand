const jwtoken = require('jsonwebtoken');
const User = require('../models/users');
// jwt verification
const adminAction = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwtoken.verify(token, 'paccy', async (err, decodedtoken) => {
      if (err) {
        res.status(400).json({ message: err });
        // next()
      }
      if (decodedtoken) {
        const data = await User.findById(decodedtoken.id);
        if (data) {
          if (data.email == 'admin-250@gmail.com' && data.password == 'admin') {
            next();
          } else {
            res
              .status(400)
              .json({ message: 'this action is accessed by the admin only' });
          }
        } else {
          res.status(400).json({ message: 'user not found' });
        }
      }
    });
  } else {
    res.status(401).json({ message: 'log in first !!' });
  }
};
module.exports = adminAction;
