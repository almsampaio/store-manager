const { StatusCodes } = require('http-status-codes');
const service = require('../services/salesService');

const create = async (req, res) => {
  const sale = req.body;

  const newSale = await service.create(sale);

  if (newSale.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(newSale);

  return res.status(StatusCodes.OK).json(newSale);
};

module.exports = {
  create,
};
