const { productsModels } = require('../models');

const createService = async (name, quantity) => {
  const create = await productsModels.createProduct(name, quantity);
  return create;
};

const findNameService = async (name) => {
  const search = await productsModels.findName(name);
  return search;
};

module.exports = {
  createService,
  findNameService,
};
