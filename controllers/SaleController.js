// const SaleModel = require('../models/Sale');
const SaleService = require('../services/Sale');

const create = async (req, res) => {
  const itensSold = req.body;

  const { status, json } = await SaleService.create(itensSold);

  return res.status(status).json(json);
};

module.exports = {
  create,
};
