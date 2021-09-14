const productsModel = require('../models/productsModel');

const validations = require('./validations');

const formatGetRequest = (response) => {
  if (response.length === 1) {
    return response[0];
  }
  return {
    products: response,
  };
};

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
  if (!id) {
    const allproducts = await productsModel.getAllProdutcts();
    return formatGetRequest(allproducts);
  }

  const validateURLId = await validations.validateURLId(id);
  if (validateURLId) return validateURLId;

  const getProductById = await productsModel.getProductById(id);

  // console.log(getProductById);

  const validationGetProductById = await validations.validationGetProductById([getProductById]);
  if (validationGetProductById) return validationGetProductById;
  return formatGetRequest(getProductById);
};

const putProducts = async (id, name, quantity) => {
  const validateURLId = validations.validateURLId(id);
  if (validateURLId) return validateURLId;
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const validationQuantity = validations.quantityValidationProducts(quantity);
  if (validationQuantity) return validationQuantity;
  const validationQuantitySring = validations.quantityTypeValidationProducts(quantity);
  if (validationQuantitySring) return validationQuantitySring;
  return productsModel.putProducts(id, name, quantity);
};

module.exports = {
  createProduct,
  getProducts,
  putProducts,
};
