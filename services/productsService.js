const { ObjectId } = require('mongodb');
const models = require('../models/productsModel');
const {
  ERROR_NAME,
  ERROR_QTD_NOT_NUMBER,
  ERROR_QTD_NUMBER,
  ERROR_ALREADY_EXISTS,
  ERROR_ID,
} = require('../helpers');

// REQUISITO 1 __________________________________________________________________________//

const validateName = (name) => {
  const regex = /^.{5,}$/;
  return regex.test(name);
};

const validateTypeNumber = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const validateId = (id) => (ObjectId.isValid(id));

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
const getAllProducts = async () => models.createProduct();

const getProductById = async (id) => {
  if (!validateId(id)) return ERROR_ID;

  const product = await models.getProductById(id);
  if (!product) return ERROR_ID;
  return product;
};

// ____________________________________________________________________________________ //

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
