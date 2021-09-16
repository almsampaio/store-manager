const productsModel = require('../models/productsModel');

const validations = require('./validations');

const createProduct = async ({ name, quantity }) => {
  const validationsName = await validations.validationsNameProduct('post', name);
  if (validationsName) return validationsName;

  const validationQuantity = await validations.validationsQuantityInsertProduct(quantity);
  if (validationQuantity) return validationQuantity;

  return productsModel.createProduct({ name, quantity });
};

const getAllProducts = async () => productsModel.getAllProdutcts();

const getProductsId = async (id) => {
  const productByURLID = await validations.validateURLId(id, 'products');
  if (productByURLID.err) return productByURLID;

  const GetProductsId = await productsModel.getProductById(id);

  return GetProductsId;
};

const putProducts = async (id, name, quantity) => {
  const validationsName = await validations.validationsNameProduct('put', name, id);
  if (validationsName) return validationsName;

  const validationQuantity = await validations.validationsQuantityInsertProduct(quantity);
  if (validationQuantity) return validationQuantity;

  const productByURLID = await validations.validateURLId(id, 'products');
  if (productByURLID.err) return productByURLID;

  return productsModel.putProducts(id, name, quantity);
};

const deleteProducts = async (id) => {
  const productByURLID = await validations.validateURLId(id, 'products');
  if (productByURLID.err) return productByURLID;

  const deletedProduct = await productsModel.deleteProducts(id);

  return deletedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsId,
  putProducts,
  deleteProducts,
};
