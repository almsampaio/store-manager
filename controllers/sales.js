const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { status } = require('../schema');

const registerSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const registerItens = await salesServices.registerSalesServices(itensSold);
  return res.status(status.status.ok).json(registerItens);
});

const getSales = async (_req, res) => {
  const getAll = await salesServices.getAllServices();
  return res.status(status.status.ok).json({ sales: getAll });
};

const getOneSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getOneServices(id);
  return res.status(status.status.ok).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  await salesServices.updateSaleServices(id, itensSold);
  return res.status(status.status.ok).json({ _id: id, itensSold });
});

module.exports = {
  registerSales,
  getSales,
  getOneSale,
  updateSale,
};
