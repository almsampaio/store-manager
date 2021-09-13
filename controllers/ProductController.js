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

module.exports = { 
  getAll,
  getById,
  create,
};
