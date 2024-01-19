const Cube = require('../models/cube');
const Accessory = require('../models/Accessory');
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

async function deleteById(id) {
  return await Cube.deleteOne({ _id: id });
}

async function updateById(id, data) {
  return await Cube.updateOne({ _id: id }, data);
}
async function getByIdwithAccessories(id) {
  return await Cube.findById(id).populate('accessories').lean();
}

function createProduct(data, userId) {
  const cube = new Cube({ ...data, creator: userId });
  return cube.save();
}

async function attachAccessory(productId, accessoryId) {
  const product = await Cube.findById(productId);
  const accessory = await Accessory.findById(accessoryId);
  product.accessories.push(accessory);
  return product.save();
}

module.exports = { create: createProduct, getAll, getById, attachAccessory, getByIdwithAccessories, updateById, deleteById };
