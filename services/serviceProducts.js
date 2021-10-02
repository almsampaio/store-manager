const { validateName, validateQuantity, 
  validateNumber, alreadyExists, validateSearch } = require('./validations');
const { createNewProduct, getAll } = require('../models/modelProducts');
const { HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../httpRequests');

const create = async (name, quantity) => {
  validateName(name);
  await alreadyExists(name);
  validateQuantity(quantity);
  validateNumber(quantity);

  const result = await createNewProduct(name, quantity);
  return {
    status: HTTP_CREATED_STATUS,
    result,
  };
};

const allProducts = async () => {
  const result = await getAll();
  return {
    status: HTTP_OK_STATUS,
    result,
  };
};

const getById = async (id) => {
  const result = await getAll(id);
  validateSearch(result);
  return {
    status: HTTP_OK_STATUS,
    result,
  };
};

module.exports = {
  create,
  allProducts,
  getById,
};