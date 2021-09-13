const { createModel } = require('../../model/sales/salesModel');

const createServices = async (products) => {
  const { result } = await createModel(products);

  return { result };
};

module.exports = { createServices };