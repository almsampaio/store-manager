const model = require('../models/productsModel');

const getAll = async () => {
  const products = await model.getAll();
  return products;
};

module.exports = {
  getAll,
};
