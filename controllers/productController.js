const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const result = await productsService();
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAllProducts,
};