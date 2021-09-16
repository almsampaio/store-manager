const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const itens = req.body;
  const result = await salesService.createSales(itens);
  return res.status(200).json(result);
};

// const getOne = (req, res) => {
//   const result = req.params;
//   return res.status(1).json(result);
// };

// const getAll = (req, res) => {
//   const result = req.params;
//   return res.status(1).json(result);
// };

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
  // getOne,
  // getAll,
  // updateOne,
  // delOne,
};