const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, requred: true },
  age: Number
});

module.exports = mongoose.model('Person', personSchema);
