// const productsControllers= require('../models/productsModel');
const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const isNameRepeat = await validations.isRepeated(name);
  if (isNameRepeat) return isNameRepeat;

  const validationQuantity = validations.quantityValidation(quantity);
  if (validationQuantity) return validationQuantity;
};

module.exports = {
  createProduct,
};
