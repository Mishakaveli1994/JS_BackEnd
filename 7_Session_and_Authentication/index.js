const express = require('express');
const cookieParser = require('cookie-parser');
// const uniquid = require('uniqid');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// ! This is replaced by express-session
// const sessionData = {};

// const session = function () {
//   return (req, res, next) => {
//     if (!req.cookies.id) {
//       const cookieId = uniquid();

//       sessionData[cookieId] = {};
//       req.session = {};
//       res.cookie('id', cookieId);
//     } else {
//       const cookieId = req.cookies.id;
//       req.session = sessionData[cookieId];
//     }
//     console.log(req.session);
//     next();
//   };
// };

app.use(cookieParser());
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// app.get('/login/:username', (req, res) => {
//   res.cookie('username', req.params.username);

//   res.send('You have been logged in!');
// });

app.get('/login/:username/:password', (req, res) => {
  const plainTextPassword = req.params.password;
  req.session.username = req.params.username;
  bcrypt.genSalt(9, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(plainTextPassword, salt, function (err, hash) {
      if (err) throw err;
      console.log(hash);
      // req.session.password = <PASSWORD>;
      // res.send('You have been logged in!');
    });
    console.log(salt);
  });

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
