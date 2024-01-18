// ? How to do it with a class
// const Model = require('./Model');

// class Cube extends Model {
//   constructor(id, name, description, imageUrl, level) {
//     super();
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.level = level;
//   }
// }

// module.exports = Cube;

const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 50
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /^https?/
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Accessory'
    }
  ],
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Cube', cubeSchema);
