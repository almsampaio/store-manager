const rescue = require('express-rescue');
const { STATUS_OK } = require('../constants/HTTPCodeErrors');

const SalesService = require('../services/SalesService');

const create = rescue(async (req, res) => {
  const { body } = req;

  const newSale = await SalesService.create(body);

  res.status(STATUS_OK).json(newSale);
});

module.exports = {
  create,
  // getAllProducts,
  // findById,
  // updateOne,
  // eliminate,
};