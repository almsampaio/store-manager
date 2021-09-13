const Products = require('../models/Products');

const create = async (name, quantity) => {
  const myProduct = await Products.findProduct;

  if (myProduct) return { status: 422, message: 'Product already exists' };

  const product = await Products.create(name, quantity);
  return { status: 201, data: product };
};

module.exports = {
  create,
};
