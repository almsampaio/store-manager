const productService = require('../services/productService');
const productModel = require('../models/productModel');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ products });
};

const getById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product) {
    return res.status(422).json({ err: {
     code: 'invalid_data',
     message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, statusCode, product } = await productService.create(name, quantity);
  if (err) return res.status(statusCode).json({ err });

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { err, statusCode } = await productService.update(id, name, quantity);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json({ id, name, quantity });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { err, statusCode, product } = await productModel.remove(id);
  await productService.remove(id);
  if (err) return res.status(statusCode).json({ err });

  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
