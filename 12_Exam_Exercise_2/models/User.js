const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SECRET, SALT_ROUNDS } = require('../config/config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [5, 'Username must be at least 5 characters long'],
    validate: [/^[a-zA-Z0-9_!./\\]+$/, 'Username must contain only letters, numbers and underscores'],
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'Password must be at least 5 characters long'],
    validate: [/^[$a-zA-Z0-9_!./\\]+$/, 'Password must contain only letters, numbers, ., /, \\']
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

// userSchema.pre('save', async function (next) {
//   const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
//   this.password = hash;
//   next();
// });

// userSchema.pre('save', function (next) {
//   bcrypt
//     .genSalt(SALT_ROUNDS)
//     .then((salt) => {
//       return bcrypt.hash(this.password, salt);
//     })
//     .then((hash) => {
//       this.password = hash;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// TODO: Add custom validation messages
module.exports = mongoose.model('User', userSchema);
