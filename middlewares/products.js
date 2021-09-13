// const { StatusCodes } = require('http-status-codes');
const productSchema = require('../schemas/products');
const productService = require('../services/products');
const statusCodes = require('../utils/httpStatusCodes');

const isValidPayload = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    return next(error);
  }
  return next();
};

const existId = async (req, _res, next) => {
  const { id } = req.params;
  const product = await productService.findProductById(id);
  if (product.err) {
    return next(product);
  }
  req.product = product;
  return next();
};

module.exports = { isValidPayload, existId };