const rescue = require('express-rescue');
const { getProducts } = require('../models/ProductsModel');

module.exports = rescue(async (req, res) => {
  const products = await getProducts();
  res.status(200).json({ products });
});
