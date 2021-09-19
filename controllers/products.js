const productsService = require('../services/products');

async function createNewProduct(req, res) {
  const { name, quantity } = req.body;
  const { status, data, message } = await productsService.createNewProduct(name, quantity);
  if (message) return res.status(status).json(message);
  res.status(status).json(data);
}

async function getAllProducts(_req, res) {
  const { status, data } = await productsService.getAll();
  return res.status(status).json(data);
}
async function getById(req, res) {
  const { id } = req.params;
  const { status, message, data } = await productsService.getById(id);
  if (message) return res.status(status).json(message);
  return res.status(status).json(data);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { status, data } = await productsService.updateProduct(id, req.body);
  res.status(status).json(data);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const { status, data, message } = await productsService.deleteProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
}

module.exports = {
  createNewProduct,
  getAllProducts,
  getById,
  updateProduct,
  deleteProduct,
};
