const productsModel = require('../models/productsModel');

const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const isNameRepeat = await validations.isRepeated(name);
  if (isNameRepeat) return isNameRepeat;

  const validationQuantity = validations.quantityValidationProducts(quantity);
  if (validationQuantity) return validationQuantity;
  return productsModel.createProduct({ name, quantity });
};

module.exports = {
  createProduct,
};
