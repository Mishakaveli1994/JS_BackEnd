const express = require('express');
const handlebars = require('express-handlebars');

function setupExpress(app) {
  app.engine(
    'hbs',
    handlebars.engine({
      defaultLayout: false,
      extname: 'hbs'
    })
  );

  app.set('view engine', 'hbs');

  app.use(express.static('public'));
}

module.exports = setupExpress;
