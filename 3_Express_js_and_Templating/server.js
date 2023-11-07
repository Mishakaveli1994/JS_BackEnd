const express = require('express');

const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/cats', (req, res) => {
  res.status(201).send('Cat created');
});

app.put('/cats/id', (req, res) => {
  console.log(`Update cat`);
});

app.all('/', (req, res) => {
  console.log('Handle all requests');
  res.end();
});

app.listen(port, () => console.log(`The server is listening on port ${port}`));
