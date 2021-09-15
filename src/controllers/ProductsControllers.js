const rescue = require('express-rescue');

const ProductsService = require('../services/ProductsService');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error, newProduct } = await ProductsService.create({ name, quantity });

  if (error) return next(error);

  res.status(201).json(newProduct);
});

const getAllProducts = rescue(async (req, res) => {
  const products = await ProductsService.getAllProducts();

  res.status(200).json(products);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error, product } = await ProductsService.findById(id);

  if (error) return next(error);

  return res.status(200).json(product);
});

module.exports = {
  create,
  getAllProducts,
  findById,
};