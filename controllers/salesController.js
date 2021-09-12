const salesService = require('../services/salesService');

const HTTP_OK = 200;
const HTTP_UNPROCESSABLE = 422;

const create = async (req, res) => {
  const itensSold = req.body;
  const { err, solded } = await salesService.create(itensSold);
  if (err) return res.status(HTTP_UNPROCESSABLE).json({ err });
  return res.status(HTTP_OK).json(solded);
};

module.exports = { create };