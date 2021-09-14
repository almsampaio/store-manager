const salesSchema = require('../schemas/sales');
const { findProductById } = require('../models/products');

const existsId = (async (value) => {
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

    if (error || !existsId) {
      return next(error);
    }
  });
  return next();
};

module.exports = { isValidPayload };