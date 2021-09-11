const productsModel = require('../models/productsModel');
const validations = require('./validations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    const errorMessage = validations.validateId();
    return { errorMessage };
  }

  return { product };
};

const create = async (name, quantity) => {
  const errorMessage = await validations.validateCreation(name, quantity);

  if (errorMessage) return errorMessage;

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

const update = async (id, name, quantity) => {
  const errorMessage = await validations.validateUpdate(name, quantity);

  if (errorMessage) return errorMessage;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return { updatedProduct };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
