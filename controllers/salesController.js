const httpStatus = require('../httpStatus');
const salesService = require('../services/salesService');

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getById(id);
  if (result.err) return res.status(httpStatus.HTTP_NOT_FOUND).json(result.err);
  res.status(httpStatus.HTTP_OK).json(result);
};

const create = async (req, res) => {
  const sale = req.body;
  const result = await salesService.create(sale);
  if (result.err) return res.status(httpStatus.HTTP_INVALID_DATA).json(result.err);
  res.status(httpStatus.HTTP_OK).json(result);
};

module.exports = {
  getById,
  create,
};