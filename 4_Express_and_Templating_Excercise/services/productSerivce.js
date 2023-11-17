const Cube = require('../models/cube');
// ? Done with callback
// const fs = require('fs');
// ? Doe with promise
const fs = require('fs/promises');
const products = require('../config/products.json');
const path = require('path');

function getAll(query) {
  let result = products;

  if (query.search) {
    result = result.filter((x) => x.name.toLowerCase().includes(query.search.toLowerCase()));
  }

  if (query.from) {
    result = result.filter((x) => Number(x.level) >= query.from);
  }

  if (query.to) {
    result = result.filter((x) => Number(x.level) <= query.to);
  }

  return result;
}

function getById(id) {
  return products.find((product) => product.id === id);
}
function createProduct(data, cubeId, callback) {
  // ? Done with callback
  // function createProduct(data, cubeId) {
  const cube = new Cube(cubeId, data.name, data.description, data.imageUrl, data.difficultyLevel);
  products.push(cube);

  // ? Implemented with callback
  // fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(products), callback);

  // ? Implemented with promise
  return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(products));
}

module.exports = { create: createProduct, getAll, getById };
