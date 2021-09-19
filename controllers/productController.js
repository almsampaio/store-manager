const productService = require('../services/productService');

const INVALID_DATA = 'invalid_data';
const HTTP_CREATED = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await productService.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: INVALID_DATA, message } });
  res.status(HTTP_CREATED).json(data);
};

module.exports = {
  create,
};
