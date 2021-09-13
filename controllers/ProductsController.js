const express = require('express');
const { validateProduct, checkProductExists } = require('../middlewares/validateProduct');
const Products = require('../services/Products');

const router = express.Router();

router.get('/:id', checkProductExists, async (req, res) => {
  const { id } = req.params;
  const product = await Products.getProductById(id);

  res.status(200).json(product);
});

router.put('/:id', validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await Products.editProduct(name, quantity, id);

  res.status(200).json(product);
});

router.delete('/:id', checkProductExists, async (req, res) => {
  const { id } = req.params;

  const product = await Products.deleteProduct(id);

  res.status(200).json(product);
});

router.get('/', async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json({ products });
});

router.post('/', validateProduct, async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Products.createProduct(name, quantity);

  res.status(201).json(product);
});

module.exports = router;
