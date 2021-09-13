const salesService = require('../services/sales');

const addNew = async (req, res, _next) => {
  const { productId, quantity } = req.body;
  const payload = { productId, quantity };

  const result = await salesService.addNew(payload);
  return res.status(200).json(result);
};

module.exports = {
  addNew,
};
