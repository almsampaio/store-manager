const productsModel = require('../models/productsModel');
const { validationToCreate, notValidId } = require('./validations');

const listProducts = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) {
    const errorMessage = notValidId();
    return { errorMessage };
  }

  return { product };
};

const create = async (name, quantity) => {
  const errorMessage = await validationToCreate(name, quantity);

  if (errorMessage) return errorMessage;

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

module.exports = {
  create,
  listProducts,
  getById,
};
