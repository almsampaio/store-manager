const productsModel = require('../models/productsModel');

async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

module.exports = {
  getAll,
};
