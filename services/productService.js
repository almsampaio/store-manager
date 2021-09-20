const productModel = require('../models/productModel');
const {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_CREATE,
  STATUS_OK,
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
  return {
    status: STATUS_OK,
    message: product,
  };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return {
    status: STATUS_OK,
    message: product,
  };
};

const update = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  return {
    status: STATUS_OK,
    message: product,
  };
};

const destroy = async (id) => {
  const product = await productModel.destroy(id);
  return {
    status: STATUS_OK,
    message: product,
  };
};

module.exports = { create, getById, getAll, update, destroy };
