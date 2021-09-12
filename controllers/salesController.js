const service = require('../services');
const { HTTP_UNPROCESSABLE_STATUS, HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../helpers');

// REQUISITO 5 ______________________________________________________________________ //

const createSales = async (req, res) => {
  const sale = req.body;

  const products = await service.salesService.createSale(sale);
  if (products.err) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  }
  return res.status(HTTP_OK_STATUS).json(products);
};

// REQUISITO 6 ______________________________________________________________________ //
const getAllSales = async (_req, res) => {
  const sales = await service.salesService.getAllSales();
  return res.status(HTTP_OK_STATUS).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await service.salesService.getSalesById(id);
  if (sales.err) return res.status(HTTP_NOT_FOUND_STATUS).json(sales);
  return res.status(HTTP_OK_STATUS).json(sales);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const newSale = await service.salesService.updateSale(id, sales);
  if (newSale.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(newSale);
  return res.status(HTTP_OK_STATUS).json(newSale);
};

// ___________________________________________________________________________________ //

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSales,
};
