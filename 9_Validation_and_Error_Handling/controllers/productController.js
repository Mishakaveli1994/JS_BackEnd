const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const validateProduct = require('../helpers/productHelpers');
const isAuthenticated = require('../middlewares/isAuthenticated');

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
    .create(req.body, req.user.id)
    .then(() => res.redirect('/products/'))
    .catch(() => res.status(500).end());
});

router.get('/details/:id([A-Za-z0-9]+)', async (req, res) => {
  const product = await productService.getByIdwithAccessories(req.params.id);
  res.render('details', { layout: 'main', title: 'Product details', product, userId: req.user?.id });
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

router.get('/:productId([A-Za-z0-9]+)/edit', isAuthenticated, async (req, res) => {
  productService.getById(req.params.productId).then((product) => {
    res.render('editCube', { layout: 'main', title: 'Edit Cube Page', product });
  });
});

router.post('/:productId([A-Za-z0-9]+)/edit', isAuthenticated, validateProduct, async (req, res) => {
  productService
    .updateById(req.params.productId, req.body)
    .then((response) => {
      res.redirect(`/products/details/${req.params.productId}`);
    })
    .catch(() => res.status(500).end());
});

router.get('/:productId([A-Za-z0-9]+)/delete', isAuthenticated, async (req, res) => {
  productService.getById(req.params.productId).then((product) => {
    res.render('deleteCube', { layout: 'main', title: 'Delete Cube Page', product });
  });
});

router.post('/:productId([A-Za-z0-9]+)/delete', isAuthenticated, async (req, res) => {
  productService.deleteById(req.params.productId).then((response) => {
    res.redirect('/products');
  });
});

module.exports = router;
