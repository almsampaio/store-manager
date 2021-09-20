const ProductsService = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const productsList = await ProductsService.getAll();

  return res.status(200).json({ products: productsList });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsService.update(id, name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.remove(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
