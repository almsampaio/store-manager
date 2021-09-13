const saleService = require('../services/saleService');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const sale = req.body;
  const result = await saleService.create(sale);
  const code = result.err ? UNPROCESSABLE_ENTITY : OK;
  return res.status(code).json(result);
};

module.exports = { create };
