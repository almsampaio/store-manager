const { createSales, getAllSales, getSaleById } = require('../services/Sales');

const addSales = async (req, res) => {
  const saleBody = req.body;
  const sale = await createSales(saleBody);

  if (sale.err) return res.status(sale.status).json({ err: sale.err });

  res.status(200).json(sale);
};

const readSales = async (_req, res) => {
  const sales = await getAllSales();

  res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);

  res.status(200).json(sale);
};

module.exports = {
  addSales,
  readSales,
  getById,
};