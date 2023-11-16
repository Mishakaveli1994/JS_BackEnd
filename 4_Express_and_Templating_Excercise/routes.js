// ? Variant to export 1
const { Router } = require('express');

const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');

// ? Variant to export 2
// const Router = require('express').Router;

// ? Variant to export 3
// const express = require('exprs');
// const router = express.Router();

const router = Router();

router.use('/', productController);
router.use('/about', aboutController);
router.get('*', (req, res) => {
  res.render('404', { layout: 'main', title: 'Page Not Found' });
});

module.exports = router;
