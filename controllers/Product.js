const rescue = require('express-rescue');
const service = require('../services/Product');
const model = require('../models/Product');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);
  if (newProduct.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newProduct);

  res.status(CREATED_STATUS).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const products = await model.getAll();
  res.status(OK_STATUS).json({ products });
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await service.findById(id);
  if (product.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(product);

  res.status(OK_STATUS).json(product);
});

module.exports = {
  create,
  getAll,
  findById,
};
