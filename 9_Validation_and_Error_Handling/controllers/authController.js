const router = require('express').Router();
const authService = require('../services/authService');
const config = require('../config/index');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');
const validator = require('validator');
const { body, validationResult } = require('express-validator');

const isStrongPasswordMiddleware = (req, res, next) => {
  const password = req.body.password;
  const isStrongPassowrd = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });

  if (!isStrongPassowrd) {
    return res.render('register', {
      layout: 'main',
      title: 'Register',
      error: { message: 'Yous should have a strong password!' },
      username: req.body.username
    });
  }

  next();
};

router.get('/login', isGuest, (req, res) => {
  res.render('login', { layout: 'main', title: 'Login' });
});

router.post('/login', isGuest, async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login({ username, password });
    res.cookie(config.COOKIE_NAME, token);
    res.redirect('/products');
  } catch (error) {
    res.render('login', { layout: 'main', title: 'Login', error });
  }
});

router.get('/register', isGuest, (req, res) => {
  res.render('register', { layout: 'main', title: 'Register' });
});

// router.post('/register', isGuest, isStrongPasswordMiddleware, async (req, res) => {

router.post(
  '/register',
  isGuest,
  body('email', 'Please provide a valid email!').isEmail().normalizeEmail(),
  body('username', 'Please provide a username!').notEmpty(),
  body('password', 'Password is too short!').isLength({ min: 5 }),
  async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.render('register', {
        layout: 'main',
        title: 'Register',
        error: { message: 'Passwords do not match!' },
        username: req.body.username
      });
    }

    const errors = validationResult(req).errors;
    // console.log(req.body.email);

    if (errors.length > 0) {
      res.render('register', { layout: 'main', title: 'Register', errors });
      return;
    }

    try {
      const user = await authService.register({ username, password });

      res.redirect('/auth/login');
    } catch (errors) {
      res.render('register', { layout: 'main', title: 'Register', errors: [errors] });
    }
  }
);

router.get('/logout', isAuthenticated, (req, res) => {
  res.clearCookie(config.COOKIE_NAME);
  res.redirect('/');
});

module.exports = router;
