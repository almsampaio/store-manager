const productsModel = require('../models/Products');

const create = async (name, quantity) => {
  const exists = await productsModel.getByName(name);

  if (exists) return;

  const product = await productsModel.create(name, quantity);

  return product;
};

module.exports = {
  create,
};