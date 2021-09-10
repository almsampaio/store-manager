const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const rescue = require('express-rescue');
const {
  // HTTP_OK_STATUS,
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

module.exports = {
  createProduct,
};
