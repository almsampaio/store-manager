const productModel = require('../models/productModel');

const error = {
  create: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },

  getByID: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const create = async (product) => {
  const result = await productModel.create(product);

  if (!result) return error.create;

  return result;
};

const getByID = async (id) => {
  const result = await productModel.getByID(id);

  if (!result) return error.getByID;

  return result;
};

const getAll = async () => productModel.getAll();

module.exports = { create, getAll, getByID };
