const productServices = require('../services/productServices');
const productModels = require('../models/productModels');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productServices.create(name, quantity);

  if (result.err) return res.status(422).json(result);
  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await productModels.getAll();

  if (!result) return res.status(404).json({ message: 'Not found.' });
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  if (result.err) return res.status(422).json(result);
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
};