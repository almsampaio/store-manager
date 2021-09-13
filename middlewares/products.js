// const { StatusCodes } = require('http-status-codes');
const productSchema = require('../schemas/products');
const productModel = require('../models/products');
const statusCodes = require('../utils/httpStatusCodes');

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
  const product = productModel.findProductById(id);
  if (!product) {
    const error = {
      err: {
        statusCode: statusCodes.invalidData,
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
    return next(error);
  }

  return next();
};

module.exports = isValidPayload;