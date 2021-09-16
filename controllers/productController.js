const productService = require('../services/productService');
const messageErro = require('../utils/errosMsg');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const createdPrudct = await productService.createProd(name, quantity);

  return res.status(201).json(createdPrudct);
};

const findAllProducts = async (_req, res) => {
  const allProducts = await productService.findAllProducts();

  return res.status(200).json({ products: allProducts });
};

const findOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findOneProduct(id);

  if (!product) return res.status(422).json(messageErro.wrongIdFormat);

  return res.status(200).json(product);
};

module.exports = { createProduct, findAllProducts, findOneProduct };