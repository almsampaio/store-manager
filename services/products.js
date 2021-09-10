const createModel = require('../models/products');

const create = async (name, qty) => {
  const product = await createModel.create(name, qty);
  return product;
};

module.exports = {
  create,
};