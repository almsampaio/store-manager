const rescue = require('express-rescue');
const { validateProduct } = require('../service/Products');

const addProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await validateProduct(name, quantity);

  res.status(201).json({ product });
});

module.exports = {
  addProduct,
};
