const ProductsService = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, code, message, product } = await ProductsService.create(name, quantity);
  if (!product) return res.status(status).json({ err: { code, message } });
  res.status(status).json(product);
};

const getAll = async (_req, res) => {
  const { status, products } = await ProductsService.getAll();
  res.status(status).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, code, message, product } = await ProductsService.getById(id);
  if (!product) return res.status(status).json({ err: { code, message } });
  res.status(status).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, code, message, product } = await ProductsService.update(id, name, quantity);
  if (!product) return res.status(status).json({ err: { code, message } });
  res.status(status).json(product);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { status, code, message, product } = await ProductsService.exclude(id);
  if (!product) return res.status(status).json({ err: { code, message } });
  res.status(status).json(product);
};

module.exports = {
 create,
 getAll,
 getById,
 update,
 exclude,
};