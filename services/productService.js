const productModel = require('../models/productModel');

const error = {
  alreadyExists: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },

  invalidID: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const create = async (product) => {
  const result = await productModel.create(product);

  if (!result) return error.alreadyExists;

  return result;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  const result = await productModel.getByID(id);

  if (!result) return error.invalidID;

  return result;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => productModel.getAll();

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, product) => {
  const result = await productModel.update(id, product);

  if (!result) return error.invalidID;

  return result;
};

module.exports = { create, getAll, getByID, update };
