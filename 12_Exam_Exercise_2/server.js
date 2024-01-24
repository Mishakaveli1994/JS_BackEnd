const express = require('express');
const { PORT } = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

require('./config/mongoose');
require('./config/express')(app);
app.use(routes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send(`The server is running on port ${PORT}...`);
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}...`);
});
