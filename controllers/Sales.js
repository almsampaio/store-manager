const salesService = require('../services/Sales');
const {
  HTTP_OK_STATUS,
  HTTP_UNPROCESSED_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpStatus/httpStatus');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(HTTP_OK_STATUS).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const saleById = await salesService.getById(id);

  if (saleById.message) return res.status(HTTP_NOT_FOUND_STATUS).json({ err: saleById });

  res.status(HTTP_OK_STATUS).json(saleById);
};

const addSales = async (req, res) => {
  const { body: salesList } = req;

  const addedSales = await salesService.addSales(salesList);

  let STATUS_CODE = HTTP_OK_STATUS;
  if (addedSales.message) {
    if (addedSales.code === 'stock_problem') {
      STATUS_CODE = HTTP_NOT_FOUND_STATUS;
    } else {
      STATUS_CODE = HTTP_UNPROCESSED_STATUS;
    }
    return res.status(STATUS_CODE).json({ err: addedSales });
  }

  res.status(HTTP_OK_STATUS).json(addedSales);
};

module.exports = {
  getAll,
  getById,
  addSales,
};
