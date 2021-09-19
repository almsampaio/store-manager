const salesService = require('../services/salesService');

const NOT_FOUND = 'not_found';
const STOCK_PROBLEM = 'stock_problem';

const createSale = async (req, res) => {
  const { status, data, message, err } = await salesService.createSale(req.body);
  if (message) return res.status(status).json({ err: { code: NOT_FOUND, message } });
  if (err) return res.status(status).json({ err: { code: STOCK_PROBLEM, message: err } });

  res.status(status).json(data);
};

module.exports = {
  createSale,
};
