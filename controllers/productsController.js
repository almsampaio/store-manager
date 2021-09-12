const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const rescue = require('express-rescue');
const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
  // HTTP_401,
  // HTTP_NOT_FOUND_STATUS,
} = require('../helpers/statusCode');

const productsService = require('../services/productsServices');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const createdProducts = await productsService.createdProducts(name, quantity);
  // console.log(createdProducts);
  if (createdProducts.err) {
    return res.status(HTTP_NO_BODY_STATUS).json(createdProducts);
  }
  return res.status(HTTP_CREATED_STATUS).json(createdProducts);
});

const getAllProducts = rescue(async (_req, res) => {
  const allProducts = await productsService.getAllProducts();
  return res.status(HTTP_OK_STATUS).json({ products: allProducts });
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const productById = await productsService.getProductById(id);

  if (productById.err) {
    return res.status(HTTP_NO_BODY_STATUS).json(productById);
  }

  return res.status(HTTP_OK_STATUS).json(productById);
});

const updateProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productsService.updateProductById(id, name, quantity);
  if (updatedProduct.err) {
    return res.status(HTTP_NO_BODY_STATUS).json(updatedProduct);
  }

  return res.status(HTTP_OK_STATUS).json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
};
