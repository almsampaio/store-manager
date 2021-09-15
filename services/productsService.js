const productsModel = require('../models/productsModel');

const validations = require('./validations');

const formatGetResponse = (response) => {
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
    return formatGetResponse(allproducts);
  }

  const productByURLID = await validations.validateURLId(id);
  if (productByURLID.err) return productByURLID;

  return formatGetResponse(productByURLID);
};

const putProducts = async (id, name, quantity) => {
  const validationName = validations.nameLengthValidation(name);
  if (validationName) return validationName;
  const validationQuantity = validations.quantityValidationProducts(quantity);
  if (validationQuantity) return validationQuantity;
  const validationQuantitySring = validations.quantityTypeValidationProducts(quantity);
  if (validationQuantitySring) return validationQuantitySring;
  const productByURLID = await validations.validateURLId(id);
  if (productByURLID.err) return productByURLID;
  return productsModel.putProducts(id, name, quantity);
};

const deleteProducts = async (id) => {
  const productByURLID = await validations.validateURLId(id);
  if (productByURLID.err) return productByURLID;
  const deletedProduct = await productsModel.deleteProducts(id);
  return deletedProduct[0];
};

module.exports = {
  createProduct,
  getProducts,
  putProducts,
  deleteProducts,
};
