const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');

const salesCreate = async (req, res) => {
  const itensSold = req.body;
  const create = await salesModel.createSales(itensSold);
  res.status(200).json(create);
};

const validateSalesId = async (req, res) => {
  const { id } = req.params;
  const validatedId = await salesService.validSalesId(id);
  if (!validatedId) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(200).json(validatedId);
};

const updateSalesUi = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  await salesModel.updateSales(id, { itensSold });
  return res.status(200).json({ _id: id, itensSold });
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSale();
  res.status(200).json({ sales });
};

module.exports = {
  getAllSales,
  salesCreate,
  validateSalesId,
  updateSalesUi,
};