const productsModel = require('../models/productsModel');
const validate = require('./validateProduct');

const create = async (name, quantity) => {
  validate.validateName(name);
  validate.validateQuantity(quantity);

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

module.exports = {
  create,
};