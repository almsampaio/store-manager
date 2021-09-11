// const productsControllers= require('../models/productsModel');
// const salesControllers= require('../models/salesModel');
const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const isNameRepeat = await validations.isRepeated(name);
  if (isNameRepeat) return isNameRepeat;

  const validationQuantity = validations.quantityValidationProducts(quantity);
  if (validationQuantity) return validationQuantity;
};

module.exports = {
  createProduct,
};
