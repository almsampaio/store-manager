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
  // const validationFormatInserted = validations.formatValidationInputProducts({ name, quantity });
  // if (validationFormatInserted) return validationFormatInserted;
  const validationsName = await validations.validationsNameProduct(name);
  if (validationsName) return validationsName;

  const validationQuantity = await validations.validationsQuantityInsertProduct(quantity);
  if (validationQuantity) return validationQuantity;
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
  const validationsName = await validations.validationNameProduct(name);
  if (validationsName) return validationsName;

  const validationQuantity = await validations.validationsQuantityInsertProduct(quantity);
  if (validationQuantity) return validationQuantity;

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
