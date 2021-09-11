const productService = require('../services/products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.create(name, quantity);
  return res.status(201).json(newProduct);
};

const getAllProducts = async (_req, res) => {
  const listOfAll = await productService.listAll();
  return res.status(200).json({ products: listOfAll });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findedId = await productService.findById(id);
  return res.status(200).json(findedId);
};

module.exports = {
  createProduct,
  getAllProducts,
  findById,
};
