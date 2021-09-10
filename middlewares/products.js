// const { StatusCodes } = require('http-status-codes');
const productSchema = require('../schemas/products');

const isValidPayload = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    return next(error);
  }
  return next();
};

module.exports = isValidPayload;