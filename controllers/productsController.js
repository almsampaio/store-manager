const { StatusCodes } = require('http-status-codes');
const service = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);
  if (newProduct.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(newProduct);

  return res.status(StatusCodes.CREATED).json(newProduct);
};

const findAll = async (_req, res) => {
  const products = await service.findAll();

  // if (products.err) return res.status(StatusCodes.NO_CONTENT).json(products);

  return res.status(StatusCodes.OK).send(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await service.findById(id);

  if (product.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(product);

  return res.status(StatusCodes.OK).json(product);
};

module.exports = {
  create,
  findAll,
  findById,
};
