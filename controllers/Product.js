const rescue = require('express-rescue');
const service = require('../services/Product');
const model = require('../models/Product');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = rescue(async (req, res) => {
  const params = req.body;
  const newProduct = await service.create(params);
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

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const updateProduct = await service.update(id, params);
  if (updateProduct.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(updateProduct);

  res.status(OK_STATUS).json(updateProduct);
});

const deleteOne = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.deleteOne(id);
  if (deletedProduct.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(deletedProduct);

  res.status(OK_STATUS).json(deletedProduct);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteOne,
};
