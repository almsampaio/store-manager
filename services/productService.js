const productModel = require('../models/productModel');
const {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_CREATE,
} = require('../utils/status');

const create = async (name, quantity) => {
  const findOne = await productModel.getByName(name);
  if (findOne) {
    return {
      status: STATUS_UNPROCESSABLE_ENTITY,
      message: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }

  const product = await productModel.create(name, quantity);
  return {
    status: STATUS_CREATE,
    message: product,
  };
};

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

module.exports = { create, getById, getAll };
