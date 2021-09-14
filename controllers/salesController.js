const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const salesService = require('../services/salesService');

const getAll = rescue(async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(HTTP_OK_STATUS).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const { err, sale } = await salesService.getById(id);

  if (err) return res.status(NOT_FOUND).json({ err });

  res.status(HTTP_OK_STATUS).json(sale);
});

const create = rescue(async (req, res) => {
  const itensSold = req.body;
  const { err, sales } = await salesService.create(itensSold);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json({ err });
  
  res.status(HTTP_OK_STATUS).json(sales);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { err, sale } = await salesService.update(id, itensSold);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json({ err });

  res.status(HTTP_OK_STATUS).json(sale);
});

module.exports = { getAll, getById, create, update };
