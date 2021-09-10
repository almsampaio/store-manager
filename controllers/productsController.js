const productsService = require('../services/productsService');

async function getAll() {
  const products = await productsService.getAll();
  return products;
}

module.exports = {
  getAll,
};
