const salesServices = require('../services/salesServices');

const addSales = async (req, res) => {
  const sales = req.body;
  const { status, result } = await salesServices.addSales(sales);
  res.status(status).json(result);
};

const getSales = async (_req, res) => {
  const { status, result } = await salesServices.getSales();
  res.status(status).json(result);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await salesServices.getSalesId(id);
  return res.status(status).json(result);
};

const updateSales = async (req, res) => {
  const sales = req.body;
  const { id } = req.params;
  const { status, result } = await salesServices.updateSales(id, sales);
  res.status(status).json(result);
};

const deleteSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await salesServices.deleteSalesId(id);
  return res.status(status).json(result);
};

module.exports = {
  addSales,
  getSales,
  getSalesId,
  updateSales,
  deleteSalesId,
};