// Recebe as requisições e manda as responses pro cliente
// Manda pro index

const productService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, statusCode, product } = await productService.create(name, quantity);
  if (err) return res.status(statusCode).json({ err });

  res.status(201).json(product);
};

const getAllProducts = async (_req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(422).json({ err: {
     code: 'invalid_data',
     message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { err, statusCode } = await productService.update(id, name, quantity);
  if (err) return res.status(statusCode).json({ err });

  res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await productService.deleteProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
  update,
  deleteProduct,
};