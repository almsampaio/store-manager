const { findByName, create } = require('../db/models/product');

async function createService(data) {
  const productExists = await findByName(data.name);
  if (productExists) throw new Error('Product already exists');

  const createProduct = await create(data);
  return createProduct;
}

module.exports = { createService };
