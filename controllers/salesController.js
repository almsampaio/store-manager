const salesServices = require('../services/salesService');

const HTTP_OK_STATUS = 200;
const HTTP_UNPR_ENTRY_STATUS = 422;
const HTTP_NOT_FOUND = 404;

const getAll = async (_req, res) => {
  const allSales = await salesServices.listSales();
  res.status(HTTP_OK_STATUS).json({ sales: allSales });
};

const getById = async (req, res) => {
  const { sale, errorMessage } = await salesServices.getById(req.params.id);

  if (errorMessage) {
    res.status(HTTP_NOT_FOUND).json(errorMessage);
  }

  res.status(HTTP_OK_STATUS).json(sale);
};

const registerSales = async (req, res) => {
  const sales = req.body;

  const { productSales, notValid, error } = await salesServices.registerSales(sales);

  if (notValid) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(notValid);
  }

  if (error) {
    return res.status(HTTP_NOT_FOUND).json(error);
  }

  return res.status(HTTP_OK_STATUS).json(productSales);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { saleUpdated, notValid, error } = await salesServices.updateSales(id, sale);

  if (notValid) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(notValid);
  }

  if (error) {
    return res.status(HTTP_NOT_FOUND).json(error);
  }

  return res.status(HTTP_OK_STATUS).json(saleUpdated);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { deletedSale, errorMessage } = await salesServices.deleteSale(id);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  return res.status(HTTP_OK_STATUS).json(deletedSale);
};

module.exports = {
  getAll,
  getById,
  registerSales,
  updateSales,
  deleteSales,
};
