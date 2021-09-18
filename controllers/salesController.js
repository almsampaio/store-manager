const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

async function getAllSales(_req, res) {
  const sales = await salesService.getAllSales();

  if (!sales) {
    return res.status(StatusCodes.NOT_FOUND).json(res);
  }

  return res.status(StatusCodes.OK).json({ sales });
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (sale === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        err: { 
          code: 'not_found', 
          message: 'Sale not found', 
        } });
    }

    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: { 
        code: 'not_found', 
        message: 'Sale not found', 
      } });
  }
}

async function validateQuantitySales(req, res, next) {
  const sales = req.body;

  if (!salesService.isValidQuantity(sales)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity', 
       } });
  }

  next();
}

async function create(req, res) {
  const sales = req.body;

  const newSale = await salesService.create(sales);

  res.status(StatusCodes.OK).json(newSale);
}

module.exports = {
  getAllSales,
  getById,
  validateQuantitySales,
  create,
};
