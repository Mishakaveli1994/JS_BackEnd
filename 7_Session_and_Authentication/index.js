const express = require('express');
const cookieParser = require('cookie-parser');
const uniqid = require('uniqid');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// ! This is replaced by express-session
// const sessionData = {};

// const session = function () {
//   return (req, res, next) => {
//     if (!req.cookies.id) {
//       const cookieId = uniqid();

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

app.use(express.urlencoded({ extended: true }));
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

app.get('/register/:username/:password', (req, res) => {
  const plainTextPassword = req.params.password;
  req.session.username = req.params.username;
  bcrypt.hash(plainTextPassword, 9, function (err, hash) {
    if (err) throw err;
    req.session.hash = hash;
    req.session.save(); // ? If not provided, it's not saved in session
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

app.get('/login/:password', (req, res) => {
  console.log(req.params.password);
  console.log(req.session.hash);
  bcrypt.compare(req.params.password, req.session.hash, function (err, isMatch) {
    if (err) throw err;
    res.send(isMatch ? 'You have been logged in!' : 'Incorrect password!');
  });
});

app.get('/token/create', (req, res) => {
  res.send(
    `<form action="/token/create" method="post">
      <div> 
        <label>Username:</label>
        <input type="text" name="username">
      </div>
      <div> 
        <label>Password:</label>
        <input type="password" name="password">
      </div>
      <div>
        <input type="submit" value="Log In">
      </div>
    </form>`
  );
});

app.post('/token/create', (req, res) => {
  bcrypt.hash(req.body.password, 9, function (err, hash) {
    if (err) throw err;

    const payloads = {
      _id: uniqid(),
      username: req.body.username,
      password: hash
    };

    const options = { expiresIn: '2d' };
    const secret = 'mySecretSecret';

    const token = jwt.sign(payloads, secret, options);
    console.log(token);

    res.cookie('token', token);
    // res.json({ token });
    res.redirect('/token/show');
  });
});

app.get('/token/show', (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, 'mySecretSecret');
  console.log(decoded);
  res.send(decoded);
});

app.get('/token/login', (req, res) => {
  res.send(
    `<form action="/token/login" method="post">
      <div> 
        <label>Username:</label>
        <input type="text" name="username">
      </div>
      <div> 
        <label>Password:</label>
        <input type="password" name="password">
      </div>
      <div>
        <input type="submit" value="Log In">
      </div>
    </form>`
  );
});

app.post('/token/login', (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, 'mySecretSecret');

  if (req.body.username !== decoded.username) {
    return res.status(401).send('Invalid username');
  }

  bcrypt.compare(req.body.password, decoded.password, function (err, isMatch) {
    if (err) throw err;
    console.log(isMatch);

    if (isMatch) {
      res.send(`You have been logged in! Welcome ${req.body.username}!`);
    } else {
      res.status(401).send('Invalid password');
    }
  });
});

app.listen(5005, function () {
  console.log('Server is running on port 5005...');
});
