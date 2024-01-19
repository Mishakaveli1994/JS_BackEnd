const { Router } = require('express');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
  res.render('createAccessory', { layout: 'main', title: 'Create Accessory Page' });
});

router.post('/create', isAuthenticated, (req, res) => {
  accessoryService
    .create(req.body)
    .then((result) => {
      res.redirect('/products');
    })
    .catch(() => res.status(500).end());
});

module.exports = router;
