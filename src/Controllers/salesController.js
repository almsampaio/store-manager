const salesService = require('../Services/salesService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_UNPROCESSABLE = 422;
const HTTP_STATUS_NOT_FOUND = 404;

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(HTTP_STATUS_OK).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getSaleById(id);
  if (sale.err) {
    return res.status(HTTP_STATUS_NOT_FOUND).json(sale);
  }
  return res.status(HTTP_STATUS_OK).json(sale);
};

const addSales = async (req, res) => {
  const sales = await salesService.addSales(req.body);
  if (sales.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(sales);
  }

  return res.status(HTTP_STATUS_OK).json(sales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  const saleToUpdate = await salesService.updateSale(id, req.body);
  if (saleToUpdate.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(saleToUpdate);
  }
  return res.status(HTTP_STATUS_OK).json(saleToUpdate);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleToDelete = await salesService.deleteSale(id);
  if (saleToDelete.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(saleToDelete);
  }
  return res.status(HTTP_STATUS_OK).json(saleToDelete);
};

module.exports = {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  deleteSale,
};