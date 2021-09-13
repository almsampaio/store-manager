const productService = require('../services/ProductsService');

const HTTP_CREATED_STATUS = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await productService.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(HTTP_CREATED_STATUS).json(data);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await productService.getById(id);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });

  res.status(200).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
};
