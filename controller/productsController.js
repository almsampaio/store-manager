const productsService = require('../service/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  if (product.err) return res.status(422).json(product);
  return res.status(product.code).json(product.inf);
};

const getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json({ products });  
};

const getPtoductsById = async (req, res) => {
  const { _id } = req.params;
  const productId = await productsService.getPtoductsById(_id);
  if (productId.err) return res.status(422).json(productId);
  return res.status(200).json(productId);
};

const editProduct = async (req, res) => {
  const { _id } = req.params;
  const { name, quantity } = req.body;
  const edit = await productsService.editProduct(_id, name, quantity);
  if (edit.err) return res.status(422).json(edit);
  return res.status(200).json({ _id, name, quantity });
};

module.exports = { createProduct, getProducts, getPtoductsById, editProduct };
