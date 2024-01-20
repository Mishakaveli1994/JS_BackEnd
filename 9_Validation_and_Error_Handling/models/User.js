const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/index.js');

const ENGLISH_ALHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    validate: {
      validator: (value) => {
        return ENGLISH_ALHANUMERIC_PATTERN.test(value);
      },
      message: (props) => {
        return `${props.value} should only contain latin characters and numbers.`;
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (value) => {
        return ENGLISH_ALHANUMERIC_PATTERN.test(value);
      },
      message: (props) => {
        return 'Password only contain latin characters and numbers.';
      }
    }
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
