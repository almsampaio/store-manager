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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  productService.updateProduct(id, name, quantity);

  const changedproduct = await productService.findOneProduct(id);

  res.status(200).json(changedproduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);

  if (!deletedProduct) return res.status(422).json(messageErro.wrongIdFormat);

  res.status(200).json(deletedProduct);
};

module.exports = {
  createProduct,
  findAllProducts,
  findOneProduct,
  updateProduct,
  deleteProduct,
};
