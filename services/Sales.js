const salesModel = require('../models/Sales');
const ERROR = require('../util/errosSales');

const create = async (sales) => {
  if (
    !sales
    || sales.some((item) => item.quantity <= 0)
    || sales.some((item) => typeof item.quantity === 'string')) return ERROR.ERROR_QUANTITY;

  const list = await salesModel.create(sales);
  return list;
};

module.exports = {
  create,
};
