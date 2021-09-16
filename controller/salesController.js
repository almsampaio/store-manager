const salesService = require('../service/salesService');

const createSales = async (req, res) => {
  const itensSold = req.body;
  const sale = await salesService.createSale(itensSold);
  if (sale.err) return res.status(422).json(sale);
  return res.status(200).json(sale);
};

const getSales = async (req, res) => {
  const sales = await salesService.getSales();
  return res.status(200).json({ sales });
};

const getIdSales = async (req, res) => {
  const { _id } = req.params;
  const saleId = await salesService.getIdSales(_id);
  if (saleId.err) return res.status(404).json(saleId);
  return res.status(200).json(saleId);
};

module.exports = { createSales, getSales, getIdSales };
