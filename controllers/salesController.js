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
  res.status(status).json(data);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceSales.updateSale(id, req.body);
  res.status(status).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await serviceSales.deleteSale(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = { createSales, getAllSales, getSaleById, updateSale, deleteSale }; 