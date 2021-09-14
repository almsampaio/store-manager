const salesService = require('../services/SalesService');

const HTTP_OK_STATUS = 200;

const createSale = async (req, res) => {
  const { status, data, message, err } = await salesService.createSale(req.body);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  if (err) return res.status(status).json({ err: { code: 'stock_problem', message: err } });

  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const products = await salesService.getAll();
  
  res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await salesService.getById(id);

  if (message) return res.status(status).json({ err: { code: 'not_found', message } });

  res.status(HTTP_OK_STATUS).json(data);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { data } = await salesService.updateSale(id, req.body);

  res.status(HTTP_OK_STATUS).json(data);
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
};
