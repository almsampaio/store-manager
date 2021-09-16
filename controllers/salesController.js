const salesService = require('../services/salesService');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(OK).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale.err) {
    res.status(OK).json(sale);
  }
  return res.status(NOT_FOUND).json(sale);
};

const create = async (req, res) => {
  const sale = req.body;
  console.log('controller sales');
  const sales = await salesService.create(sale);
  if (!sales.err) {
    return res.status(OK).json(sales);
  }
  return res.status(UNPROCESSABLE_ENTITY).json(sales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const sales = await salesService.updateSale(id, sale);
  if (!sales.err) {
    return res.status(OK).json(sales);
  }
  return res.status(UNPROCESSABLE_ENTITY).json(sales);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const sales = await salesService.deleteSale(id);
  if (!sales.err) {
    return res.status(OK).json({
      _id: id,
      itensSold: sale,
    });
  }
  return res.status(UNPROCESSABLE_ENTITY).json(sales);
};

module.exports = { getAll, getById, create, updateSale, deleteSale };
