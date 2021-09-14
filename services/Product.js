const Product = require('../models/Product');

const create = async (name, quantity) => {
  const existingProduct = await Product.findByName(name, quantity);

  if (existingProduct) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

   return Product.create(name, quantity);
};

module.exports = {
  create,
};