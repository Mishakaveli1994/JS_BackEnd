const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/index.js');

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  bcrypt
    .genSalt(config.SALT_ROUNDS)
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model('User', userSchema);
