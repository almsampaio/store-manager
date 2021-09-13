const products = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, message, data } = await products.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res(status).json(data);
};

module.exports = {
  create,
};
