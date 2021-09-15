const rescue = require('express-rescue');
const SalesServices = require('../services/sales');

const create = rescue(async (req, res) => {
  const sales = req.body;
  const createSales = await SalesServices.create(sales);
  if (createSales.err && createSales.err.code === 'stock_problem') {
    return res.status(404).json(createSales);
  }
  if (createSales.err) return res.status(422).json(createSales);
  res.status(200).json(createSales);
});

const getAll = rescue(async (_req, res) => {
  const sales = await SalesServices.getAll();
  res.status(200).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getById(id);
  if (sale.err) return res.status(404).json(sale);
  res.status(200).json(sale);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const salesArray = req.body;
  const sale = await SalesServices.update(id, salesArray);
  if (sale.err) return res.status(422).json(sale);
  res.status(200).json(sale);
});

const exclude = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.exclude(id);
  if (sale.err) return res.status(422).json(sale);
  res.status(200).json(sale);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};