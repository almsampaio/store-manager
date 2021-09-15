const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.createProduct(name, quantity);
  if (result.status) return res.status(result.status).json({ err: result }); 
  return res.status(201).json(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getOne(id);
  if (result.status) return res.status(result.status).json({ err: result }); 
  return res.status(200).json(result);
};

const getAll = async (req, res) => {
  const result = await productService.getAll();
  return res.status(200).json({ products: result });
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productService.updateOne(id, name, quantity);
  return res.status(200).json(result);
};

const delOne = async (req, res) => {
  const { id } = req.params;
  const result = await productService.delOne(id);
  if (result.status) return res.status(result.status).json({ err: result });
  return res.status(200).json(result);
};

module.exports = {
  createProduct,
  getOne,
  getAll,
  updateOne,
  delOne,
};