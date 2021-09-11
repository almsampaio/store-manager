const salesModels = require('../models/salesModels');
const { isNumber, validateQuantity } = require('../helpers/validations');

const errorList = {
  errQuantity: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
  errNotFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
};

const create = async (product) => {
  if (!product.length) return null;

  let invalidFields = 0;
  product.forEach((obj) => {
    if (!isNumber(obj.quantity) || !validateQuantity(obj.quantity)) {
      invalidFields += 1; 
    }
  });

  if (invalidFields > 0) return errorList.errQuantity;
  const result = await salesModels.create(product);
  return result;
};

const getById = async (id) => {
  const result = await salesModels.getById(id);
  if (!result) return errorList.errNotFound;
  return result;
};

module.exports = {
  create,
  getById,
};
