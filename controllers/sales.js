const salesServices = require('../services/sales');

const createSales = async (req, res) => {
  const itensSold = req.body;

  const { error, result } = await salesServices.createSales(itensSold);

  if (error) return res.status(422).json(error);
  
  return res.status(200).json(result);
};

const getSales = async (_req, res) => {
  const { sales } = await salesServices.getSales();

  return res.status(200).json({ sales });
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { sales, error } = await salesServices.getSalesById(id);

  console.log('controller', sales);

  if (error) return res.status(404).json(error);

  return res.status(200).json({ sales });
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
};
