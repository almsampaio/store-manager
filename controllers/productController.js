const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.create({ name, quantity });

  if (result.err) return res.status(422).json(result);

  return res.status(201).json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getByID(id);

  if (result.err) return res.status(422).json(result);

  return res.status(200).json(result);
};

const getAll = async (_req, res) => {
  const result = await productService.getAll();
  return res.status(200).json(result);
};

module.exports = { create, getAll, getByID };
