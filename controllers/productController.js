const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.create(name, quantity);
  return res.status(product.status).json(product.message);
};

const getAll = async (_req, res) => {
  const product = await productService.getAll();
  return res.status(product.status).json({ products: product.message });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  return res.status(product.status).json(product.message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productService.update(id, name, quantity);
  return res.status(product.status).json(product.message);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const product = await productService.destroy(id);
  return res.status(product.status).json(product.message);
};

module.exports = { create, getAll, getById, update, destroy };