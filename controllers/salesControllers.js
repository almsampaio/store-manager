const { createSale, getSales, getSaleById } = require('../services/saleServices');
const { STATUS_OK, STATUS_UNPROCESSABLE, STATUS_NOT_FOUND } = require('../utils/httpStatus');

const registerSale = async (req, res) => {
  const items = req.body;
  const itensSold = await createSale(items);
  if (!itensSold) {
    return res.status(STATUS_UNPROCESSABLE).send({});
  }
  return res.status(STATUS_OK).json(itensSold);
};

const getAllSales = async (_req, res) => {
  const sales = await getSales();
  if (sales.length === 0) {
    return res.status(STATUS_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(STATUS_OK).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);
  if (!sale) {
    return res.status(STATUS_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};
module.exports = {
  registerSale,
  getAllSales,
  getById,
};