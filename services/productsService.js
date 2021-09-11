// const productsControllers= require('../models/productsModel');
// const productsModel = require('../models/productsModel');
const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  const validationName = validations.nameLengthValidation(name);
  const validationQuantity = validations.quantityValidation(quantity);
  if (validationName) return validationName;
  if (validationQuantity) return validationQuantity;
};

module.exports = {
  createProduct,
};
