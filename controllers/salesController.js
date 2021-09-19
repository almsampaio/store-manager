const salesService = require('../services/salesService');

const HTTP_OK = 200;

const NOT_FOUND = 'not_found';
const STOCK_PROBLEM = 'stock_problem';

const createSale = async (req, res) => {
  const { status, data, message, err } = await salesService.createSale(req.body);
  if (message) return res.status(status).json({ err: { code: NOT_FOUND, message } });
  if (err) return res.status(status).json({ err: { code: STOCK_PROBLEM, message: err } });

  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const products = await salesService.getAll();

  res.status(HTTP_OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await salesService.getById(id);

  if (message) return res.status(status).json({ err: { code: NOT_FOUND, message } });

  res.status(HTTP_OK).json(data);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { data } = await salesService.updateSale(id, req.body);

  res.status(HTTP_OK).json(data);
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
};
