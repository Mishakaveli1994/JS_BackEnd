const router = require('express').Router();
const authService = require('../services/authService');
const { body, validationResult } = require('express-validator');
const { COOKIE_NAME } = require('../config/config');

router.get('/', (req, res) => {
  res.send('Auth Controller');
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'login' });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  authService
    .login(username, password)
    .then((token) => {
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.redirect('/');
    })
    .catch(next);
});

router.post(
  '/register',
  body('username', 'Username is required!').notEmpty(),
  body('password', 'Password is required!').notEmpty(),
  body('re-password')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject('Passwords do not match!'); // Can also work with throw new Error('Passwords do not match!');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return next(errors[0]);
    }
    const { username, password } = req.body;
    // TODO: Check if they are secure
    // TODO: Display errors if any
    // TODO: Display success message and status if okay
    authService
      .register(username, password)
      .then((createdUser) => {
        res.redirect('/auth/login');
      })
      .catch(next);
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/');
});

module.exports = router;