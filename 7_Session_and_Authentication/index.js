const express = require('express');
const cookieParser = require('cookie-parser');
const uniquid = require('uniqid');

const app = express();

const sessionData = {};

const session = function () {
  return (req, res, next) => {
    if (!req.cookies.id) {
      const cookieId = uniquid();
      sessionData[cookieId] = {};
      res.cookie('id', cookieId);
    } else {
      const cookieId = req.cookies.id;
      req.session = sessionData[cookieId];
      console.log(req.session);
    }
    next();
  };
};

app.use(cookieParser());
app.use(session());

// app.get('/login/:username', (req, res) => {
//   res.cookie('username', req.params.username);

//   res.send('You have been logged in!');
// });

app.get('/login/:username', (req, res) => {
  req.session.username = req.params.username;

  res.send('You have been logged in!');
});

app.get('/', (req, res) => {
  const username = req.session?.username;
  res.send(`<h1>Hello ${username || 'N/A'}  </h1>`);
});

app.get('/session', (req, res) => {
  res.send(req.sessionData);
});

app.listen(5005, function () {
  console.log('Server is running on port 5005...');
});
