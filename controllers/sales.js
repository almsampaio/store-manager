const salesService = require('../services/sales');

const addNew = async (req, res, _next) => {
  const result = await salesService.addNew(req.body);
  return res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getById(id);
  return result.message ? next(result) : res.status(200).json(result);
};

const getAll = async (req, res, next) => {
  const result = await salesService.getAll();
  return result.message ? next(result) : res.status(200).json(result);
};

const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await salesService.updateOne(payload, id);
  return result.message ? next(result) : res.status(200).json(result);
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.deleteOne(id);
  return result.message ? next(result) : res.status(200).json(result);
};

module.exports = {
  addNew,
  getById,
  getAll,
  updateOne,
  deleteOne,
};
