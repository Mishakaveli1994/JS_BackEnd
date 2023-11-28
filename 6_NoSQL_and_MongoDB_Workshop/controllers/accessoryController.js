const { Router } = require('express');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', (req, res) => {
  res.render('createAccessory', { layout: 'main', title: 'Create Accessory Page' });
});

router.post('/create', (req, res) => {
  accessoryService
    .create(req.body)
    .then((result) => {
      res.redirect('/products');
    })
    .catch(() => res.status(500).end());
});

module.exports = router;
