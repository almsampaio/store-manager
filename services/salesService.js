const salesModel = require('../models/salesModel');
const {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_OK,
  STATUS_NOT_FOUND,
} = require('../utils/status');

const create = async (products) => {
  const register = await salesModel.create(products);
  if (!products) {
    return {
      status: STATUS_UNPROCESSABLE_ENTITY,
      message: {},
    };
  }

  return {
    status: STATUS_OK,
    message: register,
  };
};

const getAll = async () => {
  const products = await salesModel.getAll();
  return {
    status: STATUS_OK,
    message: products,
  };
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  if (product === null) {
    return {
      status: STATUS_NOT_FOUND,
      message: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
    };
  }
  return {
    status: STATUS_OK,
    message: product,
  };
};

const update = async (id, itensSold) => {
  const product = await salesModel.update(id, itensSold);

  return {
    status: STATUS_OK,
    message: product,
  };
};

const destroy = async (id) => {
  const product = await salesModel.destroy(id);
  return {
    status: STATUS_OK,
    message: product,
  };
};

module.exports = { create, getAll, getById, update, destroy };
