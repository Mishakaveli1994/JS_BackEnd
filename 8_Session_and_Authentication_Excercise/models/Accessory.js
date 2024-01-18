// ? How to do it with a class
// const Model = require('./Model');

// class Accessory extends Model {
//   constructor(id, name, description, imageUrl, level) {
//     super();
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.imageUrl = imageUrl;
//   }
// }

// module.exports = Accessory;

// Create a schema for the Accessory class above

const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Accessory', accessorySchema);
