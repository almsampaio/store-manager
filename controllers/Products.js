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

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};
