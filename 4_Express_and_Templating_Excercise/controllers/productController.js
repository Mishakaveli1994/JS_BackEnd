const { Router } = require('express');
const router = Router();
const uniqid = require('uniqid');
const productService = require('../services/productSerivce');
const validateProduct = require('../middlewares/createValidation');

// ? A possible way to do it
// const index = (req, res) => {
//   res.render('home', { layout: false });
// };

// router.get('/', index);

router.get('/', (req, res) => {
  const products = productService.getAll(req.query);
  res.render('home', { layout: 'main', title: 'Cubicle', products });
});

router.get('/create', (req, res) => {
  res.render('create', { layout: 'main', title: 'Create Cube Page' });
});

router.post('/create', validateProduct, (req, res) => {
  const cubeId = uniqid();
  // ? Done with callback
  // productService.create(req.body, cubeId, (err) => {
  //   if (err) {
  //     return res.status(500).end();
  //   }
  //   res.redirect(`/products/details/${cubeId}`);
  // });

  // ? Done with promise
  productService
    .create(req.body, cubeId)
    .then(() => res.redirect(`/products/details/${cubeId}`))
    .catch(() => res.status(500).end());
});

router.get('/details/:id([A-Za-z0-9]+)', (req, res) => {
  const cube = productService.getById(req.params.id);
  res.render('details', { layout: 'main', title: 'Product details', ...cube });
});

module.exports = router;
