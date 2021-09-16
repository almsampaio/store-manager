const salesService = require('../services/salesService');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const sale = req.body;
  console.log('controller sales');
  const sales = await salesService.create(sale);
  if (!sales.err) {
    return res.status(OK).json(sales);
  }
  return res.status(UNPROCESSABLE_ENTITY).json(sales);
};

module.exports = { create };
