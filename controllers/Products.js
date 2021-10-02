const { ObjectId } = require('mongodb');
const Products = require('../services/Products');

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  const productCreated = await Products.createProduct({ name, quantity });

  res.status(201).json(productCreated);
}

async function getProducts(_req, res) {
  const products = await Products.getProducts();

  res.status(200).json({ products });
}

async function getProductById(req, res) {
  const { id } = req.params;
  const productById = await Products.getProductById(new ObjectId(id));

  res.status(200).json(productById);
}

async function editProduct(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const editedProduct = await Products.editProduct(new ObjectId(id), name, quantity);

  res.status(200).json(editedProduct);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const deletedProduct = await Products.deleteProduct(new ObjectId(id));

  res.status(200).json(deletedProduct);
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
