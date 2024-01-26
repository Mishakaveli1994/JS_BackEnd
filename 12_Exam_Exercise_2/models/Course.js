const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Description must be less than 50 characters']
  },
  imageUrl: {
    type: String,
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
