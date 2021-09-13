const salesService = require('../services/sales');

const addNew = async (req, res, _next) => {
  const result = await salesService.addNew(req.body);
  return res.status(200).json(result);
};

const get = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const result = await salesService.get({});
    return result.itensSold
      ? res.status(200).json(result)
      : next(result);
  }
  const result = await salesService.get({ id }, id);
  return res.status(200).json(result);
};

module.exports = {
  addNew,
  get,
};
