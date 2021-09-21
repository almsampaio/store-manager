const services = require('../services');

const createSale = async (req, res, _next) => {
  const saleArray = req.body;
  const newSale = await services.sales.createSale(saleArray);

  return res.status(200).json(newSale);
};

const getAllSales = async (_req, res, _next) => {
  const sales = await services.sales.getSales();

  return res.status(200).json({ sales });
};

const getSaleByID = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await services.sales.getSales(id);

  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByID,
};