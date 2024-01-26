const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'Course title must be at least 5 characters long'],
    validate: [/^[a-zA-Z0-9_!./\\ ]+$/, 'Course title must contain only letters, numbers and underscores'],
    unique: true
  },
  description: {
    type: String,
    required: true,
    minlength: [20, 'Course description must be at least 20 characters long'],
    validate: [/^[ \w._~()'!*:@,;+?-]*$/, 'Course description must contain only letters, numbers and underscores'],
    maxlength: [500, 'Course description must be less than 50 characters']
  },
  imageUrl: {
    type: String,
    validate: [
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+(?:png|jpg|jpeg|gif|svg|webp)+$/,
      'Image URL needs to start with either http or https protocol'
    ],
    reqired: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    required: true
  },
  usersEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// courseSchema.pre('save', function (next) {
//   this.createdAt = new Date();

//   next();
// });

module.exports = mongoose.model('Course', courseSchema);
