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

  return result || error.alreadyExists;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  const result = await productModel.getByID(id);

  return result || error.invalidID;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => productModel.getAll();

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, product) => {
  const result = await productModel.update(id, product);

  return result || error.invalidID;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (id) => {
  const result = await productModel.exclude(id);

  return result || error.invalidID;
};

module.exports = { create, getAll, getByID, update, exclude };
