const jwtoken = require('jsonwebtoken');
const User =require("../models/users.js")
// jwt verification
const verification = (req, res, next) => {
  const authHeader = req.headers.authentication;
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    jwtoken.verify(token, 'paccy', (err, decodedtoken) => {
      if (err) {
        res.status(401).json({ Error: 'Please Login First !!!' });
      }
      if (decodedtoken) {
        next();
      }
    });
  } else {
    const token = req.cookies.jwt;
    if (token) {
      jwtoken.verify(token, 'paccy', (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ Error: 'please first login  !!' });
        }
        if (decodedtoken) {
          User.findOne({ _id: decodedtoken.id }, (err, data) => {
            res.user = data
            next();
          })
        }
      });
    } else {
      res.status(401).json({ Message: 'please first login !!' });
    }
  }

};
module.exports = { verification };