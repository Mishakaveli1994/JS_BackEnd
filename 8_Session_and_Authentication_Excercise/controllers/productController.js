const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const validateProduct = require('../helpers/productHelpers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/', (req, res) => {
  productService
    .getAll(req.query)
    .then((products) => {
      res.render('home', { layout: 'main', title: 'Cubicle', products });
    })
    .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => {
  res.render('create', { layout: 'main', title: 'Create Cube Page' });
});

router.post('/create', isAuthenticated, validateProduct, (req, res) => {
  // ? Done with promise
  productService
    .create(req.body)
    .then(() => res.redirect('/products/'))
    .catch(() => res.status(500).end());
});

router.get('/details/:id([A-Za-z0-9]+)', async (req, res) => {
  const product = await productService.getByIdwithAccessories(req.params.id);
  res.render('details', { layout: 'main', title: 'Product details', product });
});

router.get('/:productId([A-Za-z0-9]+)/attach', isAuthenticated, async (req, res) => {
  const product = await productService.getById(req.params.productId);
  const accessories = await accessoryService.getAllBesides(product.accessories);

  res.render('attachAccessory', { layout: 'main', title: 'Attach Accessory Page', product, accessories });
});

router.post('/:productId([A-Za-z0-9]+)/attach', isAuthenticated, (req, res) => {
  productService
    .attachAccessory(req.params.productId, req.body.accessory)
    .then(() => res.redirect(`/products/details/${req.params.productId}`));
});

module.exports = router;
