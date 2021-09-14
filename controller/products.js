const rescue = require('express-rescue');
const serviceProdut = require('../service/products');

const createProduct = rescue(
  async (req, res) => {
    const { name, quantity } = req.body;
    const result = await serviceProdut.createProduct(name, quantity);
    return res.status(201).json(result);
  },
);

module.exports = {
  createProduct,
};
