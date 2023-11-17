const { Router } = require('express');
const router = Router();

// ? A possible way to do it
// const index = (req, res) => {
//   res.render('home', { layout: false });
// };

// router.get('/', index);

router.get('/', (req, res) => {
  res.render('home', { layout: 'main', title: 'Cubicle' });
});

router.get('/create', (req, res) => {
  res.render('create', { layout: 'main', title: 'Create Cube Page' });
});

router.get('/details/:id', (req, res) => {
  res.render('details', { layout: 'main', title: 'Product details' });
});

module.exports = router;
