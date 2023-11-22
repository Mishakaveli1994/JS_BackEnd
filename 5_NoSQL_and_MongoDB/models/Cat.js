const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }
});

catSchema.methods.getInfo = function () {
  console.log(`I'm ${this.name} and I'm ${this.age} years old`);
};

catSchema.virtual('birthYear').get(function () {
  return new Date().getFullYear() - this.age;
});

catSchema.path('age').validate(function () {
  return this.age >= 0 && this.age <= 100;
}, 'Age must be between 0 and 100 years');

module.exports = mongoose.model('Cat', catSchema);
