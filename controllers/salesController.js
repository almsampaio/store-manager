const salesServices = require('../services/salesServices');
const httpStatus = require('../utils/httpStatus');

const getAllSales = async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  res.status(httpStatus.ok).json({ sales: allSales });
};

const getSalesById = async (req, res) => {
  const { sale, errorMessage } = await salesServices.getSalesById(req.params.id);

  if (errorMessage) {
    res.status(httpStatus.notFound).json(errorMessage);
  }

  res.status(httpStatus.ok).json(sale);
};

const createSale = async (req, res) => {
  const sales = req.body;

  const { prodSale, errorMessage } = await salesServices.createSale(sales);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  return res.status(httpStatus.ok).json(prodSale);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};
