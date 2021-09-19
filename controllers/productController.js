const productService = require('../services/productService');

const INVALID_DATA = 'invalid_data';
const HTTP_CREATED = 201;
const HTTP_OK = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await productService.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: INVALID_DATA, message } });
  res.status(HTTP_CREATED).json(data);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(HTTP_OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await productService.getById(id);

  if (message) return res.status(status).json({ err: { code: INVALID_DATA, message } });

  res.status(HTTP_OK).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
};
