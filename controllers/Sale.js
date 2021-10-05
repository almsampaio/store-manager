const rescue = require('express-rescue');
const service = require('../services/Sale');
const model = require('../models/Sale');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY_STATUS = 422;
const NOT_FOUND_STATUS = 404;

const create = rescue(async (req, res) => {
  const newSale = await service.create(req.body);
  if (newSale.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newSale);

  res.status(OK_STATUS).json(newSale);
});

const getAll = rescue(async (req, res) => {
  const sales = await model.getAll();
  res.status(OK_STATUS).json({ sales });
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await service.findById(id);
  if (sale.err) return res.status(NOT_FOUND_STATUS).json(sale);

  res.status(OK_STATUS).json(sale);
});

module.exports = {
  create,
  getAll,
  findById,
};
