const Cube = require('../models/cube');
async function getAll(query) {
  let products = await Cube.find({}).lean();

  if (query.search) {
    products = products.filter((x) => x.name.toLowerCase().includes(query.search.toLowerCase()));
  }

  if (query.from) {
    products = products.filter((x) => Number(x.level) >= query.from);
  }

  if (query.to) {
    products = products.filter((x) => Number(x.level) <= query.to);
  }

  return products;
}

async function getById(id) {
  return await Cube.findById(id).lean();
}
function createProduct(data) {
  const cube = new Cube(data);

  return cube.save();
}

module.exports = { create: createProduct, getAll, getById };
