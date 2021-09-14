const rescue = require('express-rescue');
const salesServices = require('../services/sales');

const createSales = rescue(async (req, res) => {
  const itensSold = req.body;

  const { error, result } = await salesServices.createSales(itensSold);

  if (error && error.err.code === 'stock_problem') return res.status(404).json(error);
  if (error) return res.status(422).json(error);
  
  return res.status(200).json(result);
});

const getSales = rescue(async (_req, res) => {
  const { sales } = await salesServices.getSales();

  return res.status(200).json({ sales });
});

const getSalesById = rescue(async (req, res) => {
  const { id } = req.params;

  const { sales, error } = await salesServices.getSalesById(id);

  if (error) return res.status(404).json(error);

  return res.status(200).json({ sales });
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const { result, error } = await salesServices.updateSale(id, itensSold);

  if (error) return res.status(422).json(error);

  return res.status(200).json(result);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const { result, error } = await salesServices.deleteSale(id);

  if (error) return res.status(422).json(error);

  return res.status(200).json(result);
});

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSale,
  deleteSale,
};
