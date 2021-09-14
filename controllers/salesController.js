const salesService = require('../services/salesService');

const HTTP_200 = 200;
const HTTP_422 = 422;

const create = async (req, res) => {
  const itensSold = req.body;
  const { err, sale } = await salesService.create(itensSold);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(sale);
};

const getAll = async (_req, res) => {
  const sale = await salesService.getAll();
  return res.status(HTTP_200).json({ sales: sale });
};

module.exports = {
  create,
  getAll,
};