const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales;
  return res.status(200).json({ sales: allSales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const idSale = await salesService.getSaleById(id);
  if (!idSale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(200).json(idSale); 
};

module.exports = {
  getAllSales,
  getSaleById,
};
