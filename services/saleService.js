const saleModel = require('../models/saleModel');

const create = async (sale) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  const result = await saleModel.create(sale);

  return result || error;
};

module.exports = { create };
