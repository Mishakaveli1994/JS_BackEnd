const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie(COOKIE_NAME);
      } else {
        req.user = decoded;
        res.locals.user = decoded;
        res.locals.isAuth = true;
      }
    });
  }
  next();
}

function isAuthorized(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/auth/login');
    }
  });
  next();
}

module.exports = { isAuthenticated, isAuthorized };
