const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');

const salesCreate = async (req, res) => {
  const itensSold = req.body;
  const create = await salesModel.createSales(itensSold);
  res.status(200).json(create);
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSale();
  res.status(200).json({ sales });
};

module.exports = {
  getAllSales,
  salesCreate,
};