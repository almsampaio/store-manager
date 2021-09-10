const productService = require('../services/products');
const httpStatus = require('../utils/httpStatusCodes');

const insertOne = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.insertOne(name, quantity);
  if (product.err) {
    return next(product.err);
  }
  return res.status(httpStatus.created).json(product);
};

module.exports = { insertOne };