// const productsControllers= require('../models/productsModel');
// const productsModel = require('../models/productsModel');
const validations = require('./validations');

const createProduct = async ({ name, _quantity }) => {
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
};

module.exports = {
  createProduct,
};
