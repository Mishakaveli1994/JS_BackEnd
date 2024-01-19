const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/about', (req, res) => {
  res.render('about', { layout: 'main', title: 'About' });
});

module.exports = router;
