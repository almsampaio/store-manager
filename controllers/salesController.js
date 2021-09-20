const salesService = require('../services/salesService');

const create = async (req, res) => {
  const products = req.body;
  const register = await salesService.create(products);
  return res.status(register.status).json(register.message);
};

const getAll = async (_req, res) => {
  const product = await salesService.getAll();
  return res.status(product.status).json({ sales: product.message });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await salesService.getById(id);
  return res.status(product.status).json(product.message);
};

const update = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;
  const product = await salesService.update(id, itensSold);
  return res.status(product.status).json(product.message);
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  const product = await salesService.destroy(id);
  res.status(product.status).json(product.message);
  next(getById(id));
};

module.exports = { create, getAll, getById, update, destroy };