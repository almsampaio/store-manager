const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.addProduct(name, quantity);
  if (result.err) return res.status(422).json(result);
  res.status(201).json(result);
};

const findAll = async (_req, res) => {
  const products = await productService.findAll();
  res.status(200).json({ products });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
};

module.exports = {
  addProduct,
  findById,
  findAll,
};