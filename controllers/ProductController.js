const ProductService = require('../services/ProductService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = { name, quantity };

  const newProduct = await ProductService.create(product);

  if (newProduct.err) return res.status(422).json(newProduct);

  res.status(201).json(newProduct);
};

const getAll = async (_req, _res) => {};

module.exports = { 
  create,
  getAll,
};
