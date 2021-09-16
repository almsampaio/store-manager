const productService = require('../services/productService');
const { STATUS_OK } = require('../utils/status');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.create(name, quantity);
  return res.status(product.status).json(product.message);
};

const getAll = async (_req, res) => {
  const product = await productService.getAll();
  return res.status(STATUS_OK).json({ products: product });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  return res.status(STATUS_OK).json(product);
};

module.exports = { create, getAll, getById };