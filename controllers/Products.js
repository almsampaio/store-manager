const rescue = require('express-rescue');
const productService = require('../services/Products');

const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_UNPROCESSED_STATUS } = require('../httpStatus/httpStatus');

const getAll = rescue(async (req, res) => {
  const products = await productService.getAll();

  res.status(HTTP_OK_STATUS).json(products);
});

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);

  if (newProduct.err) return res.status(HTTP_UNPROCESSED_STATUS).json(newProduct);

  return res.status(HTTP_CREATED_STATUS).json(newProduct);
});

module.exports = {
  getAll,
  create,
};
