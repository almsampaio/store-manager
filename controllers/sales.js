const salesService = require('../services/sales');

const createSale = async (req, res) => {
  const itensSold = req.body;

  const newSale = await salesService.create(itensSold);
  return res.status(200).json(newSale);
};

const getAllSales = async (_req, res) => {
  const listOfAll = await salesService.listAll();
  return res.status(200).json({ sales: listOfAll });
};

const findBySalesId = async (req, res) => {
  const { id } = req.params;
  const findedId = await salesService.findById(id);
  return res.status(200).json(findedId);
};

module.exports = {
  createSale,
  getAllSales,
  findBySalesId,
};