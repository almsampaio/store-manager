const salesService = require('../services/salesService');
const messageErro = require('../utils/errosMsg');

const create = async (req, res) => {
  const itensSold = req.body;
  const created = await salesService.create(itensSold);

  return res.status(200).json(created);
};

const findSales = async (_req, res) => {
  const sales = await salesService.findSales();

  return res.status(200).json({ sales });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.findById(id);

  if (!sales) return res.status(404).json(messageErro.saleNoteFound);

  res.status(200).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  await salesService.update(id, itensSold);

  const findSold = await salesService.findById(id);

  return res.status(200).json(findSold);
};

module.exports = { create, findSales, findById, update };
