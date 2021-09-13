const salesService = require('../services/salesService');

const HTTP_200 = 200;
const HTTP_404 = 404;
const HTTP_422 = 422;

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  return res.status(HTTP_200).json({ sales: allSales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const idSale = await salesService.getSaleById(id);
  if (!idSale) {
    return res.status(HTTP_404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(HTTP_200).json(idSale); 
};

const createSale = async (req, res) => {
  const itensSold = req.body;
  const { err, createdSale } = await salesService.createSale(itensSold);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(createdSale);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
