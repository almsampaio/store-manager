const rescue = require('express-rescue');
const { STATUS_OK } = require('../constants/HTTPCodeErrors');

const SalesService = require('../services/SalesService');

const create = rescue(async (req, res) => {
  const sale = req.body.map(({ productId, quantity }) => ({
    productId,
    quantity,
  }));

  const newSale = await SalesService.create(sale);

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

const updateOne = rescue(async (req, res) => {
  const itenSold = req.body;
  
  const { id } = req.params;

  const updated = await SalesService.updateOne(id, itenSold);

  return res.status(STATUS_OK).json(updated);
});

const eliminate = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const { error, eliminated } = await SalesService.eliminate(id);

  if (error) return next(error);

  return res.status(200).json(eliminated);
});

module.exports = {
  create,
  getAllSales,
  findById,
  updateOne,
  eliminate,
};
