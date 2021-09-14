const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.getById(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = { name, quantity };

  const newProduct = await ProductService.create(product);

  if (newProduct.err) return res.status(422).json(newProduct);

  res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await ProductService.update(id, { name, quantity });

  if (updatedProduct.err) return res.status(422).json(updatedProduct);

  res.status(200).json(updatedProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const removedProduct = await ProductService.remove(id);

  if (removedProduct.err) return res.status(422).json(removedProduct);

  res.status(200).json(removedProduct);
};

module.exports = { 
  getAll,
  getById,
  create,
  update,
  remove,
};
