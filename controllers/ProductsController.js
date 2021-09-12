const express = require('express');
const { validateProduct } = require('../middlewares/validateProduct');
const Products = require('../services/Products');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Products.getProductById(id);

  if (!product) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

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
