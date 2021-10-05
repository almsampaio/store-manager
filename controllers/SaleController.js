const SaleModel = require('../models/Sale');
const SaleService = require('../services/Sale');

const create = async (req, res) => {
  const itensSold = req.body;

  const { status, json } = await SaleService.create(itensSold);

  return res.status(status).json(json);
};

const getAll = async (req, res) => {
  const sales = await SaleModel.getAll();
  return res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await SaleModel.getById(id);

  if (!sale) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
