const salesService = require('../services/salesService');

const create = async (req, res) => {
  const itensSold = req.body;
  const created = await salesService.create(itensSold);
  console.log(created);
  return res.status(200).json(created);
};

const findSales = async (_req, res) => {
  const allSales = await salesService.findSales();

  return res.status(200).json({ products: allSales });
};

module.exports = { create, findSales };
