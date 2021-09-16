const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  res.status(200).json(sales);
};

// const getById = async (req, res) => {
//   const { id } = req.params;

//   const product = await SalesService.getById(id);

//   if (product.err) return res.status(404).json(product);

//   res.status(200).json(product);
// };

const create = async (req, res) => {
  const salesArray = req.body;

  const newSales = await SalesService.create(salesArray);

  if (newSales.err) return res.status(422).json(newSales);

  res.status(200).json(newSales);
};

module.exports = { 
  getAll,
  getById,
  create,
};