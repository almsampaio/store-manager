const rescue = require('express-rescue');
const service = require('../services/productsService');

const create = rescue(async (req, res) => {
  const { product_name, product_quantity } = req.body;

  const createProduct = await service.create(product_name, product_quantity);

  res.status(201).json(createProduct);
});

module.exports = {
  create,
};
