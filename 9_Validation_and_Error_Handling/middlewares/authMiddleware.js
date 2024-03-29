const { COOKIE_NAME, SECRET } = require('../config/index');
const jwt = require('jsonwebtoken');

module.exports = function () {
  return (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
      jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
          res.clearCookie(COOKIE_NAME);
        } else {
          req.user = decoded;
          res.locals.user = decoded;
          res.locals.isAuthenticated = true;
        }
      });
    }
    next();
  };
};
