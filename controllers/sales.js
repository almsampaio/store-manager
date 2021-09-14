const salesService = require('../services/sales');
const httpStatus = require('../utils/httpStatusCodes');

const insertSales = async (req, res, _next) => {
  const sales = req.body;
  const response = await salesService.insertSales(sales);
  return res.status(httpStatus.ok).json(response);
};

const getSales = async (req, res, _next) => {
  res.status(httpStatus.ok).json(await salesService.getSales());
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.err) {
    return next(sale.err);
  }
  return res.status(httpStatus.ok).json(sale);
};

const updateSale = async (req, res, _next) => {
  const { id } = req.params;
  const sales = req.body;
  const updatedSale = await salesService.updateSale(id, sales);
  console.log(updatedSale);
  return res.status(httpStatus.ok).json(updatedSale);
};

module.exports = { insertSales, getSales, getSaleById, updateSale };