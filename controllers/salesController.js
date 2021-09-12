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

  const { productSales, errorMessage } = await salesServices.registerSales(sales);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  return res.status(HTTP_OK_STATUS).json(productSales);
};

module.exports = {
  getAll,
  getById,
  registerSales,
};
