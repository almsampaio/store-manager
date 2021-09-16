const productsModel = require('../models/productsModel');
const validations = require('./validations/productsValidation');

async function create(name, quantity) {
  await validations.isNameValid(name);
  validations.isQuantityValid(quantity);

  const newProductId = await productsModel.create(name, quantity);
  return newProductId;
}

module.exports = {
  create,
};
