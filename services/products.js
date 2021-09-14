const productsModel = require('../models/Products');
const validation = require('./validations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const create = async (name, quantity) => {
  const validNameLength = validation.validNameLength(name);
  if (validNameLength) return validNameLength;

  const isNameExists = await validation.isNameExists(name);
  if (isNameExists) return isNameExists;

  const isSmallerOrIqualQuantity = validation.isSmallerOrIqualQuantity(quantity);
  if (isSmallerOrIqualQuantity) return isSmallerOrIqualQuantity;

  const isNotNumber = validation.isNotNumber(quantity);
  if (isNotNumber) return isNotNumber;

  const newProduct = await productsModel.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const validNameLength = validation.validNameLength(name);
  if (validNameLength) return validNameLength;

  const isSmallerOrIqualQuantity = validation.isSmallerOrIqualQuantity(quantity);
  if (isSmallerOrIqualQuantity) return isSmallerOrIqualQuantity;

  const isNotNumber = validation.isNotNumber(quantity);
  if (isNotNumber) return isNotNumber;

  const updateProduct = await productsModel.update(id, name, quantity);
  return updateProduct;
};

const exclude = async (id) => {
  const excludeProduct = await productsModel.exclude(id);
  if (!excludeProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return excludeProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
