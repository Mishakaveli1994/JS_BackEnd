const fs = require('fs/promises');
const productsDB = require('../config/products.json');
const path = require('path');

class Model {
  save() {
    productsDB.push(this);
    return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(productsDB));
  }

  static getAll() {
    return productsDB;
  }

  static getById(id) {
    return productsDB.find((product) => product.id === id);
  }
}

module.exports = Model;
