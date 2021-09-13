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

const HTTP_200 = 200;
const HTTP_404 = 404;
const HTTP_422 = 422;

const createSale = async (req, res) => {
  const itensSold = req.body;
  const { error, err, createdSale } = await salesService.createSale(itensSold);
  if (error) return res.status(HTTP_404).json(error);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(createdSale);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
