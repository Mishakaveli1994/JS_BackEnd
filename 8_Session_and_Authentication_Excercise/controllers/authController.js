const router = require('express').Router();
const authService = require('../services/authService');
const config = require('../config/index');

router.get('/login', (req, res) => {
  res.render('login', { layout: 'main', title: 'Login' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login({ username, password });
    res.cookie(config.COOKIE_NAME, token);
    res.redirect('/products');
  } catch (error) {
    res.render('login', { layout: 'main', title: 'Login', error });
  }
});

router.get('/register', (req, res) => {
  res.render('register', { layout: 'main', title: 'Register' });
});

router.post('/register', async (req, res) => {
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

module.exports = router;
