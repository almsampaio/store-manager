const productService = require('../services/productService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

// ----------------------------------------------------- || ----------------------------------------------------- //

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.create({ name, quantity });

  const code = result.err ? UNPROCESSABLE_ENTITY : CREATED;

  return res.status(code).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getByID(id);

  const code = result.err ? UNPROCESSABLE_ENTITY : OK;

  return res.status(code).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async (_req, res) => {
  const result = await productService.getAll();
  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = { name, quantity };

  const result = await productService.update(id, product);

  const code = result.err ? UNPROCESSABLE_ENTITY : OK;

  return res.status(code).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (req, res) => {
  const { id } = req.params;
  const result = await productService.exclude(id);

  const code = result.err ? UNPROCESSABLE_ENTITY : OK;

  return res.status(code).json(result);
};

module.exports = { create, getAll, getByID, update, exclude };
