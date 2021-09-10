const productsService = require('../services/productsService');
const httpStatus = require('../httpStatus');
const returnMsg = require('../returnMsg');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.create(name, quantity);
  
  if (!result.err) return res.status(httpStatus.HTTP_CREATED_SUCCESS).json(result);
  res.status(httpStatus.HTTP_INVALID_DATA).json(result.err);
};

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  res.status(httpStatus.HTTP_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (!result) return res.status(httpStatus.HTTP_INVALID_DATA).json(returnMsg.invalidIdFormat);
  res.status(httpStatus.HTTP_OK).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
};
