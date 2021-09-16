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

// const updateOne = (req, res) => {
//   const result = req.params;
//   return res.status(1).json(result);
// };

// const delOne = (req, res) => {
//   const result = req.params;
//   return res.status(1).json(result);
// };

module.exports = {
  createSales,
  getOne,
  getAll,
  // updateOne,
  // delOne,
};