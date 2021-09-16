const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const itensSold = req.body; 

  const { sales, message, status } = await salesService.addSale(itensSold);
  if (!sales) return res.status(status).json(message);
  
  res.status(200).json(sales);
};

const listSales = async (_req, res) => {
  const sales = await salesService.listSales();
  
  res.status(200).json({ sales });
};

const listSaleId = async (req, res) => {
  const { id } = req.params;
  const { saleId, message, statusNotFound } = await salesService.listSaleId(id);

  if (!saleId) return res.status(statusNotFound).json(message);

  res.status(200).json(saleId);
};

module.exports = {
  addSale,
  listSales,
  listSaleId,
};