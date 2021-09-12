const productService = require('../services/ProductsService');

const HTTP_CREATED_STATUS = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await productService.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(HTTP_CREATED_STATUS).json(data);
};

module.exports = {
  create,
};
