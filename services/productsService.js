const models = require('../models/productsModel');
const {
  validateName,
  validateTypeNumber,
  validateQuantity,
  validateId,
} = require('../middlewares');
const {
  ERROR_NAME,
  ERROR_QTD_NOT_NUMBER,
  ERROR_QTD_NUMBER,
  ERROR_ALREADY_EXISTS,
  ERROR_ID,
} = require('../helpers');

// REQUISITO 1 __________________________________________________________________________//

const createProduct = async (product) => {
  const { name, quantity } = product;

  if (!validateName(name)) return ERROR_NAME;
  if (!validateTypeNumber(quantity)) return ERROR_QTD_NOT_NUMBER;
  if (!validateQuantity(quantity)) return ERROR_QTD_NUMBER;

  const ifExist = await models.getProductByName(name);
  if (ifExist) return ERROR_ALREADY_EXISTS;
  return models.createProduct(product);
};

// REQUISITO 2 _________________________________________________________________________//
const getAllProducts = async () => {
  const products = await models.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  if (!validateId(id)) return ERROR_ID;

  const product = await models.getProductById(id);
  if (!product) return ERROR_ID;
  return product;
};

// REQUISITO 3 __________________________________________________________________________//
const editProduct = async (id, product) => {
  const { name, quantity } = product;
  if (!validateName(name)) return ERROR_NAME;
  if (!validateTypeNumber(quantity)) return ERROR_QTD_NOT_NUMBER;
  if (!validateQuantity(quantity)) return ERROR_QTD_NUMBER;
  const products = await models.editProduct(id, product);
  return products;
};

// REQUISITO 4 __________________________________________________________________________//

const deleteProduct = async (id) => {
  if (!validateId(id)) return ERROR_ID;
  const deleteExist = await models.getProductById(id);
  if (!deleteExist) return ERROR_ID;
  const { deleteId, productDelete } = await models.deleteProduct(id);
  if (!productDelete) return deleteId;
};
// ____________________________________________________________________________________ //

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
