const productsModel = require('../models/productsModel');

const minNameLength = 5;
const minQuantity = 1;
const nameErr = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};
const minQuantityErr = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};
const quantityStringErr = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const create = async (name, quantity) => {
  if (name.length < minNameLength) return nameErr;

  if (quantity < minQuantity) return minQuantityErr;

  if (typeof (quantity) === 'string') return quantityStringErr;

  const exists = await productsModel.findByName(name);

  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } };
  }

  const product = await productsModel.create(name, quantity);
  return { product };
};

module.exports = { create };