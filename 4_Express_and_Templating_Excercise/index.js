const express = require('express');
const config = require('./config/config');
const routes = require('./routes');
const app = express();

require('./config/express')(app);

// ? Works like a middleware
app.use(routes);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`));