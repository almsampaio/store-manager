const {
  createModel,
  readByNameModel,
} = require('../../model/products/productsModel');

const createServices = async (name, quantity) => {
  const findName = await readByNameModel(name);

  if (findName) {
    return {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const data = await createModel(name, quantity);

  return { data };
};

module.exports = { createServices };