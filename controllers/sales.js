const salesService = require('../services/sales');

const addNew = async (req, res, _next) => {
  const result = await salesService.addNew(req.body);
  return res.status(200).json(result);
};

module.exports = {
  addNew,
};
