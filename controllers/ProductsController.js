const productService = require('../services/ProductsService');

const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await productService.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(HTTP_CREATED_STATUS).json(data);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  
  res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await productService.getById(id);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });

  res.status(HTTP_OK_STATUS).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.updateProduct(id, name, quantity);

  res.status(HTTP_OK_STATUS).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
};
