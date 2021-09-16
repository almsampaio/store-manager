const { isProductValid, alreadyExists } = require('../validations/productsValidation'); 
const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const validations = isProductValid(name, quantity);
  if (validations.message) return validations;

  const existenceValidation = await alreadyExists(name);
  if (existenceValidation.message) return existenceValidation;

  const createdProd = await productsModel.createProduct(name, quantity);
  return createdProd;
};

async function getAllProducts() {
  const products = await productsModel.getAllProducts();
  return products;
}

async function getByID(id) {
  const product = await productsModel.getByID(id);
  return product;
}

const updateProduct = async (id, name, quantity) => {
  const validation = isProductValid(name, quantity);
  if (validation.message) return validation;

  await productsModel.update(id, name, quantity);
  return { _id: id, name, quantity };
};

async function validateID(id) {
  const productId = await productsModel.getByID(id);

  if (!productId) return false;

  return true;
}

async function deleteProduct(id) {
  const product = await productsModel.deleteProduct(id);

  return product;
}

module.exports = { 
  create,
  getAllProducts,
  getByID,
  updateProduct,
  validateID,
  deleteProduct,
};
