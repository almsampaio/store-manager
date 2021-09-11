const httpStatus = require('../httpStatus');
const salesService = require('../services/salesService');

const create = async (req, res) => {
  const sale = req.body;
  const result = await salesService.create(sale);
  if (result.err) return res.status(httpStatus.HTTP_INVALID_DATA).json(result.err);
  res.status(httpStatus.HTTP_OK).json(result);
};

module.exports = {
  create,
};