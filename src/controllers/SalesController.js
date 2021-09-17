const rescue = require('express-rescue');
const { STATUS_OK } = require('../constants/HTTPCodeErrors');

const SalesService = require('../services/SalesService');

const create = rescue(async (req, res) => {
  const { body } = req;

  const newSale = await SalesService.create(body);

  res.status(STATUS_OK).json(newSale);
});

const getAllSales = rescue(async (_req, res, next) => {
  const { error, sales } = await SalesService.getAllSales();

  if (error) {
    return next(error);
  }

  return res.status(STATUS_OK).json(sales);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error, sale } = await SalesService.findById(id);

  if (error) {
    return next(error);
  }
  
  return res.status(STATUS_OK).json(sale);
});

module.exports = {
  create,
  getAllSales,
  findById,
  // updateOne,
  // eliminate,
};