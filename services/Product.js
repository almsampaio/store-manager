const Product = require('../models/Product');

const create = async (name, quantity) => {
  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    const errorMsg = {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
    return errorMsg;
  }

   return Product.create(name, quantity);
};

module.exports = {
  create,
};