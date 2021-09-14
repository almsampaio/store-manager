const salesService = require('../services/salesService');

const HTTP_OK = 200;
const HTTP_UNPROCESSABLE = 422;
const HTTP_NOTFOUND = 404;

const create = async (req, res) => {
  const itensSold = req.body;
  const { err, solded } = await salesService.create(itensSold);
  if (err) return res.status(HTTP_UNPROCESSABLE).json({ err });
  return res.status(HTTP_OK).json(solded);
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(HTTP_OK).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (!sale) {
    return res.status(HTTP_NOTFOUND).json({ err:
      { code: 'not_found', message: 'Sale not found' },
    });
  }
  return res.status(HTTP_OK).json(sale);
};

const editSaleById = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { err, solded } = await salesService.editSaleById(id, itensSold);
  if (err) return res.status(HTTP_UNPROCESSABLE).json({ err });
  return res.status(HTTP_OK).json(solded);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (!sale) {
    return res.status(HTTP_UNPROCESSABLE).json({ err:
      { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  await salesService.deleteSaleById(id);
  return res.status(HTTP_OK).json(sale.value);
};

module.exports = {
  create,
  getAllSales,
  getSaleById,
  editSaleById,
  deleteSaleById,
};