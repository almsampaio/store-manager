const saleModel = require('../models/saleModel');

const create = async (sales) => {
  const sale = await saleModel.create(sales);
  return sale;
};

module.exports = {
  create,
};
