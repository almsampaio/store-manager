const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { status } = require('../schema');

const addSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const registerItens = await salesServices.addSales(itensSold);
  return res.status(status.status.ok).json(registerItens);
});

const findSales = async (_req, res) => {
  const getAll = await salesServices.findSales();
  return res.status(status.status.ok).json({ sales: getAll });
};

const findSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findSale(id);
  return res.status(status.status.ok).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  await salesServices.updateSale(id, itensSold);
  return res.status(status.status.ok).json({ _id: id, itensSold });
});

const deleteSale = async () => {};

module.exports = {
  addSales,
  findSales,
  findSale,
  updateSale,
  deleteSale,
};
