const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const checkCatIdMiddleware = require('./middlewares/middleware');
const middlewareLogger = require('./middlewares/logger');
const cats = require('./cats.js');
const createCat = require('./services/createCat');
const { faker } = require('@faker-js/faker');
const Cat = require('./models/Cat');
require('./config/db');
// const path = require('path');

const app = express();

const port = 5000;

// Another way to use middleware
// app.use(checkCatIdMiddleware);

app.use('/static', express.static('public'));
app.use(middlewareLogger);
app.use(bodyParser.urlencoded({ extended: false }));

// Integrate handlebars
app.engine('hbs', handlebars.engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  Cat.find({ name: 'Elta' })
    .populate('owner')
    .then((cat) => console.log(cat));
  // ? Population Example
  // createCat(faker.person.firstName(), 'Persian', faker.person.firstName());
  // res.sendFile('./views/home.html', { root: __dirname });
  // res.send('Index page');
});

app.get('/cats', (req, res) => {
  res.render('cats', { cats: cats.getAll() });
});

app.post('/cats', (req, res) => {
  const catName = req.body.catName;
  cats.add(catName);
  res.redirect('/cats');
});

app.get('/cats/:catId(\\d+)?', checkCatIdMiddleware, (req, res) => {
  res.send(`You are looking at the profile of ${req.params.catId}!`);
});

app.listen(port, () => console.log(`The server is listening on port ${port}`));
