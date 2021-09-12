const productModel = require('../models/ProductsModel');

const create = async (name, quantity) => {
  const findByName = await productModel.getByName(name);
  const createdProduct = await productModel.create(name, quantity);

  if (findByName) return { status: 422, message: 'Product already exists' };

  return { status: 201, data: createdProduct };
};

module.exports = {
  create,
};
