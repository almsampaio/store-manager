const { salesSchema, saleIdSchema } = require('../schemas/sales');
const { findProductById } = require('../models/products');

const existsProductId = (async (value) => {
  const response = await findProductById(value);
  if (!response) {
    return false;
  }
  return true;
});

const isValidPayload = (req, _res, next) => {
  req.body.forEach((sale) => {
    const { productId, quantity } = sale;
    const { error } = salesSchema.validate({ productId, quantity });
    if (error || !existsProductId(productId)) {
      return next(error);
    }
  });
  return next();
};

const isValidSaleId = async (req, _res, next) => {
  const { id } = req.params;
  const { error } = saleIdSchema.validate({ id });
  if (error) {
    return next(error);
  }
  return next();
};

module.exports = { isValidPayload, isValidSaleId };