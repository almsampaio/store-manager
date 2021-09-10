const productsModel = require('../models/productsModel');
const generateError = require('../utils/errorMessage');

const listProducts = async () => {
  const products = await productsModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  if (name.length < 5) {
    const errorMessage = generateError(
      'invalid_data',
      '"name" length must be at least 5 characters long',
    );
    return { errorMessage };
  }

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

module.exports = {
  create,
  listProducts,
};
