const salesService = require('../services/salesServices');

const insertSale = async (req, res) => {
  const result = await salesService.insertSale(req.body);

  if (result.message) {
    return res.status(result.status).json({ err: { code: 'not_found', message: result.message } });
  }

  res.status(result.status).json(result.data);
};

module.exports = {
  insertSale,
};