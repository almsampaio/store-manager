const Sales = require('../services/Sales');

const createSales = async (req, res) => {
  const soldItems = req.body;
  const { status, data } = await Sales.createSales(soldItems);
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

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
};
