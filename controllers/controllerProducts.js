const { create, allProducts, getById } = require('../services/serviceProducts');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await create(name, quantity);
  return res.status(status).json(result);
};

const getAllProducts = async (_req, res) => {
  const { status, result } = await allProducts();
  return res.status(status).json(result);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await getById(id);
  return res.status(status).json(result);
};

module.exports = {
  createProduct,
  getAllProducts,
  productById,
};