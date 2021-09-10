const productsModel = require('../models/productsModel');
const { validateId, validateCreation } = require('./validations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    const errorMessage = validateId();
    return { errorMessage };
  }

  return { product };
};

const create = async (name, quantity) => {
  const errorMessage = await validateCreation(name, quantity);

  if (errorMessage) return errorMessage;

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

module.exports = {
  create,
  getAll,
  getById,
};
