const productsModel = require('../models/productsModel');

const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  // const validationFormat = validations.formatValidationInputProducts({ name, quantity });
  // if (validationFormat) return validationFormat;
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const isNameRepeat = await validations.isRepeated(name);
  if (isNameRepeat) return isNameRepeat;
  const validationQuantity = validations.quantityValidationProducts(quantity);
  if (validationQuantity) return validationQuantity;
  const validationQuantitySring = validations.quantityTypeValidationProducts(quantity);
  if (validationQuantitySring) return validationQuantitySring;
  return productsModel.createProduct({ name, quantity });
};

const getProducts = async (id) => {
  if (!id) return productsModel.getAllProdutcts();

  const validationIdURLLength = validations.validationIdURLLength(id);
  if (validationIdURLLength) return validationIdURLLength;

  const getProductById = await productsModel.getProductById(id);
  const validationGetProductById = await validations.validationGetProductById([...getProductById]);
  if (validationGetProductById) return validationGetProductById;
  
  return getProductById;
};

module.exports = {
  createProduct,
  getProducts,
};
