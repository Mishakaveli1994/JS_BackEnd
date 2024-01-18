// ? Variant to export 1
const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accesoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

// ? Variant to export 2
// const Router = require('express').Router;

// ? Variant to export 3
// const express = require('exprs');
// const router = express.Router();

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories', accesoryController);
router.get('*', (req, res) => {
  res.render('404', { layout: 'main', title: 'Page Not Found' });
});

module.exports = router;
