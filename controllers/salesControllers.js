const salesServices = require('../services/salesServices');
const salesModels = require('../models/salesModels');

const create = async (req, res) => {
  const result = await salesServices.create(req.body);
  if (result.err) return res.status(422).json(result);
  res.status(200).json(result);
};

const getAll = async (_req, res) => {
  const result = await salesModels.getAll();

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getById(id);
  if (result.err) return res.status(404).json(result);
  res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const [format] = req.body;
  const { productId, quantity } = format;
  const result = await salesServices.updateById(id, productId, quantity);
  if (result.err) return res.status(422).json(result);
  res.status(200).json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.removeById(id);
  if (result.err) return res.status(422).json(result);
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
};
