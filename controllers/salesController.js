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

module.exports = { create, getAll, getById };