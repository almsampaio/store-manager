const saleModel = require('../models/saleModel');

const error = {
  wrongId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
  saleNotFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
};

const create = async (sale) => {
  const result = await saleModel.create(sale);

  return result || error.wrongIdOrQuantity;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  const result = await saleModel.getByID(id);

  return result || error.saleNotFound;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => saleModel.getAll();

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, sale) => {
  const result = await saleModel.update(id, sale);

  return result || error.wrongId;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (id) => {
  const result = await saleModel.exclude(id);

  return result || error.wrongId;
};

module.exports = { create, getByID, getAll, update, exclude };
