const salesService = require('../services/sales');
const httpStatus = require('../utils/httpStatusCodes');

const insertSales = async (req, res, _next) => {
  const sales = req.body;
  const response = await salesService.insertSales(sales);
  return res.status(httpStatus.ok).json(response);
};

const getSales = async (req, res, _next) => {
  res.status(httpStatus.ok).json(salesService.getSales());
};

const getSalesById = async (req, res, _next) => {
  const { id } = req.params;
  res.status(httpStatus.ok).json(salesService.getSalesById(id));
};

module.exports = { insertSales, getSales, getSalesById };