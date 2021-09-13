// const { StatusCodes } = require('http-status-codes');
const productSchema = require('../schemas/products');
const productModel = require('../models/products');

const isValidPayload = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    return next(error);
  }
  return next();
};

const existId = (req, _res, next) => {
  const { id } = req.params;
  productModel.existsProduct;
};

module.exports = isValidPayload;