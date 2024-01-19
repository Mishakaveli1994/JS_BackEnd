const express = require('express');
const handlebars = require('express-handlebars');
const auth = require('../middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

function setupExpress(app) {
  app.engine(
    'hbs',
    handlebars.engine({
      defaultLayout: false,
      extname: 'hbs',
      helpers: require('../helpers/handlebarsHelpers')
    })
  );

  app.set('view engine', 'hbs');

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(auth());
}

module.exports = setupExpress;
