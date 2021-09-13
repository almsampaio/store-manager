const products = require('../models/Products');

const create = async (name, quantity) => {
  const myProduct = await products.findProduct;

  if (myProduct) return { status: 422, message: 'Product already exists' };

  const product = await products.create(name, quantity);
  return { status: 201, data: product };
};

module.exports = {
  create,
};
