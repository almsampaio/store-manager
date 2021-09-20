const salesModel = require('../models/salesModel');
const {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_OK,
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

module.exports = { create, getAll };