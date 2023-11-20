const fs = require('fs/promises');
const productsDB = require('../config/products.json');
const path = require('path');

module.exports = {
  getAll() {
    return productsDB;
  },
  getById(id) {
    return productsDB.find((product) => product.id === id);
  },
  create(product) {
    productsDB.push(product);
    return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(productsDB));
  }
};
