const Accessory = require('../models/Accessory');

function create(data) {
  const accessory = new Accessory(data);

  return accessory.save();
}

async function getAll() {
  return await Accessory.find({}).lean();
}

async function getAllBesides(ids) {
  return await Accessory.find({ _id: { $nin: ids } }).lean();
}

module.exports = { create, getAll, getAllBesides };
