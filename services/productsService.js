const productsModel = require('../models/productsModel');

const minimumNameLength = 5;
const minimumQuantity = 1;
const nameError = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  } };
const minQuantityError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};
const quantityStringError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const getAll = async () => {
  const products = productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = productsModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  if (name.length < minimumNameLength) return nameError;

  if (quantity < minimumQuantity) return minQuantityError;

  if (typeof (quantity) === 'string') return quantityStringError;

  const exists = await productsModel.findByName(name);
  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } };
  }

  const product = await productsModel.create(name, quantity);
  return { product };
};

const editById = async (id, name, quantity) => {
  if (name.length < minimumNameLength) return nameError;

  if (quantity < minimumQuantity) return minQuantityError;

  if (typeof (quantity) === 'string') return quantityStringError;

  const product = await productsModel.editById(id, name, quantity);
  return { product };
};

const deleteById = async (id) => {
  const product = productsModel.deleteById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
