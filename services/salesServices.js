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
  errWrongSaleId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
  errQuantityLimit: {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
  },
};

const productIsValid = (product) => {
  if (!product.length) return null;

  let invalidFields = 0;
  product.forEach((obj) => {
    if (!isNumber(obj.quantity) || !validateQuantity(obj.quantity)) {
      invalidFields += 1; 
    }
  });

  if (invalidFields > 0) return errorList.errQuantity;
  return true;
};

const create = async (product) => {
  if (productIsValid(product) !== true) return productIsValid(product);
  const result = await salesModels.create(product);
  if (!result) return errorList.errQuantityLimit;
  return result;
};

const getById = async (id) => {
  const result = await salesModels.getById(id);
  if (!result) return errorList.errNotFound;
  return result;
};

const updateById = async (id, productId, quantity) => {
  if (!isNumber(quantity) || !validateQuantity(quantity)) {
    return errorList.errQuantity;
  }

  const result = await salesModels.updateById(id, productId, quantity);
  if (!result) return errorList.errWrongId;
  return result;
};

const removeById = async (id) => {
  const result = await salesModels.removeById(id);
  if (!result) return errorList.errWrongSaleId;
  return result;
};

module.exports = {
  create,
  getById,
  updateById,
  removeById,
};
