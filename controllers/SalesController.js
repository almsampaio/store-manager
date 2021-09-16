const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  res.status(200).json(sales);
};

const create = async (req, res) => {
  const salesArray = req.body;

  const newSales = await SalesService.create(salesArray);

  if (newSales.err) return res.status(422).json(newSales);

  res.status(200).json(newSales);
};

module.exports = { 
  getAll,
  create,
};