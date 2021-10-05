const rescue = require('express-rescue');
const service = require('../services/Sale');
const model = require('../models/Sale');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY_STATUS = 422;
const NOT_FOUND_STATUS = 404;

const create = rescue(async (req, res) => {
  const newSale = await service.create(req.body);

  if (newSale.err && newSale.err.code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newSale);
  }
  if (newSale.err && newSale.err.code === 'stock_problem') {
    return res.status(NOT_FOUND_STATUS).json(newSale);
  }

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

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const updateSale = await service.update(id, sales);
  if (updateSale.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(updateSale);

  res.status(OK_STATUS).json(updateSale);
});

const deleteOne = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedSale = await service.deleteOne(id);
  if (deletedSale.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(deletedSale);

  res.status(OK_STATUS).json(deletedSale);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteOne,
};
