const ProductsModel = require('../models/products');
const validation = require('./validations');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return {
    products,
  };
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return product;
};

const exclude = async (id) => {
  const product = await ProductsModel.exclude(id);
  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return product;
};

const update = async (id, name, quantity) => {
  const validName = validation.validateNameLength(name);
  if (validName) return validName;

  const validQuantity = validation.validateQuantity(quantity);
  if (validQuantity) return validQuantity;

  const newProduct = await ProductsModel.update(id, name, quantity);
  return newProduct;
};

const create = async (name, quantity) => {
  const validName = validation.validateNameLength(name);
  if (validName) return validName;

  const availableName = await validation.isAvailable(name);
  if (availableName) return availableName;

  const validQuantity = validation.validateQuantity(quantity);
  if (validQuantity) return validQuantity;

  const newProduct = await ProductsModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};