const salesServices = require('../services/salesServices');

const createSale = async (req, res, next) => {
  const sales = req.body;
  const response = await salesServices.createSale(sales);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

const getAllSales = async (req, res) => {
  const sales = await salesServices.getAllSales();
  return res.status(200).json(sales);
};

module.exports = {
  createSale,
  getAllSales,
};
