// const { StatusCodes } = require('http-status-codes');
const { productIdSchema, productSchema } = require('../schemas/products');

const isValidPayload = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    return next(error);
  }
  return next();
};

const isValidId = async (req, _res, next) => {
  const { id } = req.params;
  const { error } = productIdSchema.validate({ id });
  if (error) {
    return next(error);
  }
  return next();
};

module.exports = { isValidPayload, isValidId };