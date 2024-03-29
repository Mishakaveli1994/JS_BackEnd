const express = require('express');
const config = require('./config/index');
const routes = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

// ? Works like a middleware
app.use(routes);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`));
