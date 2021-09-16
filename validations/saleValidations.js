const { listSaleId } = require('../models/salesModel');

const quantityInvalid = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  const saleNotExists = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  const status = 422;
  const statusNotFound = 404;

const salesValidations = ([{ quantity }]) => {
    if (quantity < 1) return { status, message: quantityInvalid };
    if (typeof quantity === 'string') return { status, message: quantityInvalid };
    return {};
};

const saleValidationNotExist = async (id) => {
  const productId = await listSaleId(id);
  if (!productId) return { statusNotFound, message: saleNotExists };
  return {};
};

module.exports = {
salesValidations,
saleValidationNotExist,
};