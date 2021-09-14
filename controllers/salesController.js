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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const { updatedSale, errorMessage } = await salesServices.updateSale(id, sale);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  return res.status(httpStatus.ok).json(updatedSale);
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { removedSale, errorMessage } = await salesServices.removeSale(id);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  return res.status(httpStatus.ok).json(removedSale);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  removeSale,
};
