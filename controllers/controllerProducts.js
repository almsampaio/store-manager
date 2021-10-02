const { create } = require('../services/serviceProducts');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await create(name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  createProduct,
};