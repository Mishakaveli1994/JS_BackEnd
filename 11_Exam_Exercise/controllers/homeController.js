const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.render('home/index', { title: 'Home Page' });
});

router.get('/secret', isAuthorized, (req, res) => {
  res.render('home/index', { title: 'Home Page' });
});

module.exports = router;
