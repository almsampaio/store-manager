const saleService = require('../services/saleService');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const sale = req.body;
  const result = await saleService.create(sale);
  const code = result.err ? UNPROCESSABLE_ENTITY : OK;
  return res.status(code).json(result);
};

// ----------------------------------------------------- // ----------------------------------------------------- //

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getByID(id);

  const code = result.err ? NOT_FOUND : OK;

  return res.status(code).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async (_req, res) => {
  const result = await saleService.getAll();
  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const result = await saleService.update(id, sale);

  const code = result.err ? UNPROCESSABLE_ENTITY : OK;

  return res.status(code).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (req, res) => {
  const { id } = req.params;

  const result = await saleService.exclude(id);

  const code = result.err ? UNPROCESSABLE_ENTITY : OK;

  return res.status(code).json(result);
};

module.exports = { create, getByID, getAll, update, exclude };
