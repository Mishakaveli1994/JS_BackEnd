const mongoose = require('mongoose');
const { DB_URI } = require('./config');

mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Connected to database!'));

module.exports = db;
