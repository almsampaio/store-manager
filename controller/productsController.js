const productsService = require('../service/productsService');
const productsModel = require('../model/productsModel');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  if (product.err) return res.status(422).json(product);
  return res.status(product.code).json(product.inf);
};

const getProducts = async (req, res) => {
  const products = await productsModel.getProducts();
  res.status(200).json({ products });  
};

module.exports = { createProduct, getProducts };
