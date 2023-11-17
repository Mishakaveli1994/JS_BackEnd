const { Router } = require('express');
const router = Router();

// ? A possible way to do it
// const index = (req, res) => {
//   res.render('home', { layout: false });
// };

// router.get('/', index);

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/about', (req, res) => {
  res.render('about', { layout: 'main', title: 'About' });
});

module.exports = router;
