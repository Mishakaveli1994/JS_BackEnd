const mongoose = require('mongoose');

async function connectToMongo() {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', console.log.bind(console, 'Connected to database!'));
  await mongoose.connect('mongodb://127.0.0.1:27017/catagram');
}

connectToMongo().catch(console.error);
