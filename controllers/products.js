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

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const edited = await productService.editProduct(id, name, quantity);
  return res.status(200).json(edited);
};

const deleteByid = async (req, res) => {
  const { id } = req.params;
  const deleted = await productService.deleteById(id);
  return res.status(200).json(deleted);
};

module.exports = {
  createProduct,
  getAllProducts,
  findById,
  editProduct,
  deleteByid,
};
