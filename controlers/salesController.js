const saleService = require('../services/saleService');

const createSales = async (req, res) => {
  const itensSold = req.body;
  const result = await saleService.createSales(itensSold);
  if (result.err) return res.status(422).json({ err: result.err });

  return res.status(200).json(result);
};

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAllSales();

  return res.status(200).json({ sales });
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;
  const sales = await saleService.getByIdSales(id);

  if (sales.err) return res.status(404).json({ err: sales.err });

  return res.status(200).json(sales);
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
};
