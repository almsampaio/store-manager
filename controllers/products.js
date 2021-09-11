const rescue = require('express-rescue');
const ProductsServices = require('../services/products');

const getAll = rescue(async (_req, res) => {
  const products = await ProductsServices.getAll();
  res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getById(id);
  if (product.err) return res.status(422).json(product);
  res.status(200).json(product);
});

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.create(name, quantity);
  if (product.err) return res.status(422).json(product);
  res.status(201).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
};