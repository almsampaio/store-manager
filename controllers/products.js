const productService = require('../services/products');
const httpStatus = require('../utils/httpStatusCodes');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  return res.status(httpStatus.ok).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findProductById(id);
  return res.status(httpStatus.ok).json(product);
};

const insertOne = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.insertOne(name, quantity);
  if (product.err) {
    return next(product.err);
  }
  return res.status(httpStatus.created).json(product);
};

module.exports = { insertOne, getAllProducts, getProductById };