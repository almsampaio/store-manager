const Sales = require('../services/Sales');

const createSales = async (req, res) => {
  const soldItems = req.body;
  const { status, data, message } = await Sales.createSales(soldItems);
  if (message) return res.status(status).json({ err: { code: 'stock_problem', message } });
  res.status(status).json(data);
};

const getAllSales = async (req, res) => {
  const { status, sales } = await Sales.getAllSales();
  res.status(status).json({ sales });
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message, sale } = await Sales.getSalesById(id);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  res.status(status).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { status, data } = await Sales.updateSale(id, itensSold);
  res.status(status).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, message, deletedSale } = await Sales.deleteSale(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(deletedSale);
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
