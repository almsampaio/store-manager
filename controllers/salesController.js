const serviceSales = require('../services/salesService');

const createSales = async (req, res) => {
  const sales = req.body;
  const { status, data } = await serviceSales.createSales(sales);
  // if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const getAllSales = async (_req, res) => {
  const { status, data } = await serviceSales.getAllSales();
  res.status(status).json({ sales: data });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await serviceSales.getSaleById(id);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  req.status(status).json(data);
};

module.exports = { createSales, getAllSales, getSaleById }; 