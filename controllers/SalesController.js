const salesService = require('../services/SalesService');

const createSale = async (req, res) => {
  const { status, data, message, err } = await salesService.createSale(req.body);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  if (err) return res.status(status).json({ err: { code: 'stock_problem', message: err } });

  res.status(status).json(data);
};

module.exports = {
  createSale,
};
