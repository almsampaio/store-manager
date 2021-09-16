const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const itens = req.body;
  const result = await salesService.createSales(itens);
  return res.status(200).json(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getOne(id);
  if (result.status) return res.status(result.status).json({ err: result });
  return res.status(200).json(result);
};

const getAll = async (req, res) => {
  const result = await salesService.getAll();
  return res.status(200).json(result);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const saleContent = req.body;
  const result = await salesService.updateOne(id, saleContent);
  return res.status(200).json(result);
};

const delOne = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.delOne(id);
  return res.status(200).json(result);
};

module.exports = {
  createSales,
  getOne,
  getAll,
  updateOne,
  delOne,
};