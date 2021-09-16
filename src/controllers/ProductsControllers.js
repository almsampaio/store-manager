const rescue = require('express-rescue');
const { STATUS_OK, CREATE } = require('../constants/HTTPCodeErrors');

const ProductsService = require('../services/ProductsService');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error, newProduct } = await ProductsService.create({ name, quantity });

  if (error) return next(error);

  res.status(CREATE).json(newProduct);
});

const getAllProducts = rescue(async (req, res) => {
  const products = await ProductsService.getAllProducts();

  res.status(STATUS_OK).json(products);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error, product } = await ProductsService.findById(id);

  if (error) return next(error);

   res.status(STATUS_OK).json(product);
});

const updateOne = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const { error, updated } = await ProductsService.updateOne(id, { name, quantity });

  if (error) return next(error);

   res.status(STATUS_OK).json(updated);
});

const eliminate = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error, eliminated } = await ProductsService.eliminate(id);

  if (error) return next(error);

  res.status(STATUS_OK).json(eliminated);
});

module.exports = {
  create,
  getAllProducts,
  findById,
  updateOne,
  eliminate,
};