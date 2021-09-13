const saleModel = require('../models/saleModel');

const error = {
  wrongIdOrQuantity: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
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

  return result || error.wrongIdOrQuantity;
};

module.exports = { create, getByID, getAll, update };
