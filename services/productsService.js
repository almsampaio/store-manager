const models = require('../models/productsModel');
const {
  ERROR_NAME,
  ERROR_QTD_NOT_NUMBER,
  ERROR_QTD_NUMBER,
  ERROR_ALREADY_EXISTS,
} = require('../helpers');

// REQUISITO 1 __________________________________________________________________________//

const validateName = (name) => {
  const regex = /^.{5,}$/;
  return regex.test(name);
};

const validateTypeNumber = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const createProduct = async (product) => {
  const { name, quantity } = product;

  if (!validateName(name)) return ERROR_NAME;
  if (!validateTypeNumber(quantity)) return ERROR_QTD_NOT_NUMBER;
  if (!validateQuantity(quantity)) return ERROR_QTD_NUMBER;

  const ifExist = await models.getProductByName(name);
  if (ifExist) return ERROR_ALREADY_EXISTS;
  return models.createProduct(product);
};

// ______________________________________________________________________________________//

module.exports = {
  createProduct,
};
