const salesService = require('../services/sales');
const httpStatus = require('../utils/httpStatusCodes');

const insertSales = async (req, res, _next) => {
  const sales = req.body;
  const response = await salesService.insertSales(sales);
  return res.status(httpStatus.ok).json(response);
};

module.exports = { insertSales };