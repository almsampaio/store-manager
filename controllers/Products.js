const Products = require('../services/Products');

const getAll = async (_req, res) => {
  const { status, data } = await Products.getAll();
  res.status(status).json({ products: data });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Products.getById(id);
  res.status(status).json(data);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data } = await Products.create(name, quantity);
  res.status(status).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Products.remove(id);
  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, data } = await Products.update(id, name, quantity);
  res.status(status).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};