const Products = require('../services/Products');

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  const productCreated = await Products.createProduct({ name, quantity });

  res.status(201).json(productCreated);
}

module.exports = {
  createProduct,
};
