const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const checkCatIdMiddleware = require('./middlewares/middleware.js');
const middlewareLogger = require('./middlewares/logger.js');
const cats = require('./cats.js');
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
  res.sendFile('./views/home.html', { root: __dirname });
  res.send('Index page');
});

app.get('/download', (req, res) => {
  res.download('./views/home.html');
});

app.get('/attachment', (req, res) => {
  res.attachment('./views/home.html');
  res.send('The file has been sent'); // The difference between download is that I have to end the response myself.
});
app.get('/json', (req, res) => {
  res.json(['Navcho', 'Clutchi', 'Mishi', 'Rasho']);
});

app.get('/redirect', (req, res) => {
  res.redirect('/');
});

// app.get('/sendFile', (req, res) => {
//   // res.sendFile(path.join(__dirname, '/views/home.html'));
//   res.sendFile('./views/home.html', { root: __dirname });
// });

// app
//   .get('/cats', (req, res) => {
//     res.send('Cute cats!');
//   })
//   .post('/cats', (req, res) => {
//     console.log('Created cat');
//     res.status(201).send('Cat created');
//   });

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
