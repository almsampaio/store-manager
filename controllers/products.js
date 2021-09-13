const productService = require('../services/products');

const addNew = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.addNew({ name, quantity });

  if (newProduct.message) return next(newProduct);
  return res.status(201).json(newProduct);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (product.message) return next(product);
  return res.status(200).json(product);
};

const getAll = async (_req, res, _next) => {
  const products = await productService.getAll();
  return res.status(200).json(products);
};

const updateOne = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await productService.updateOne({ name, quantity });
  if (result.message) return next(result);
  return res.status(200).json(result);
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.excludeOne(id);
  if (result.message) return next(result);
  return res.status(200).json(result);
};

module.exports = {
  addNew,
  getById,
  getAll,
  updateOne,
  deleteOne,
};
