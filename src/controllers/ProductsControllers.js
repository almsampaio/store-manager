const rescue = require('express-rescue');

const ProductsService = require('../services/ProductsService');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error, newProduct } = await ProductsService.create({ name, quantity });

  if (error) return next(error);

  res.status(201).json(newProduct);
});

module.exports = {
  create,
};