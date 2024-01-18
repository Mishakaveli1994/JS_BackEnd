const router = require('express').Router();
const authService = require('../services/authService');
const config = require('../config/index');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

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

router.post('/register', isGuest, async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.render('register', { layout: 'main', title: 'Register', error: { message: 'Passwords do not match!' } });
  }

  try {
    const user = await authService.register({ username, password });

    res.redirect('/login');
  } catch (error) {
    res.render('register', { layout: 'main', title: 'Register', error });
  }
});

router.get('/logout', isAuthenticated, (req, res) => {
  res.clearCookie(config.COOKIE_NAME);
  res.redirect('/');
});

module.exports = router;
