const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const validateProduct = require('../middlewares/createValidation');

router.get('/', (req, res) => {
  productService
    .getAll(req.query)
    .then((products) => {
      res.render('home', { layout: 'main', title: 'Cubicle', products });
    })
    .catch(() => res.status(500).end());
});

router.get('/create', (req, res) => {
  res.render('create', { layout: 'main', title: 'Create Cube Page' });
});

router.post('/create', validateProduct, (req, res) => {
  // ? Done with promise
  productService
    .create(req.body)
    .then(() => res.redirect('/products/'))
    .catch(() => res.status(500).end());
});

router.get('/details/:id([A-Za-z0-9]+)', (req, res) => {
  productService
    .getById(req.params.id)
    .then((cube) => {
      res.render('details', { layout: 'main', title: 'Product details', ...cube });
    })
    .catch(() => res.status(500).end());
});

module.exports = router;
