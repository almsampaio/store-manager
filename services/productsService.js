const Products = require('../models/productsModel');

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);

  if (existingProduct) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return Products.create(name, quantity);
};

module.exports = {
  create,
};
