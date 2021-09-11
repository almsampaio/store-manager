const express = require('express');
const { validateProduct } = require('../middlewares/validateProduct');
const Products = require('../services/Products');

const router = express.Router();

router.post('/', validateProduct, async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Products.createProduct(name, quantity);

  res.status(201).json(product);
});

module.exports = router;
