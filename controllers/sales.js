const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');
const service = require('../services/sales');

const app = express();
app.use(bodyparser.json());

const createSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const createdSales = await service.createSales(itensSold);
  console.log('controller', createdSales);
   if (createdSales.err) {
    return res.status(422).json(createdSales);
  }
  return res.status(200).json(createdSales);
});

/* const getAll = rescue(async (req, res) => {
  const products = await service.getAll();

  res.status(200).json(products);
});
const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const productId = await service.getById(id);
  if (productId.err) {
    return res.status(422).json(productId);
  }
  res.status(200).json(productId);
});

const productUpdate = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await service.productUpdate(id, name, quantity);
  if (updatedProduct.err) {
    return res.status(422).json(updatedProduct);
  }
  res.status(200).json(updatedProduct);
});

const productDelete = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.productDelete(id);
  if (deletedProduct.err) {
    return res.status(422).json(deletedProduct);
  }
  res.status(200).json(deletedProduct);
}); */

module.exports = {
  // getAll,
  createSales,
  /* getById,
  productUpdate,
  productDelete, */
  
};