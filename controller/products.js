const rescue = require('express-rescue');
const serviceProdut = require('../service/products');

const createProduct = rescue(
  async (req, res) => {
    const { name, quantity } = req.body;
    const result = await serviceProdut.createProduct(name, quantity);
    return res.status(201).json(result);
  },
);

const findProducts = rescue(
  async (_req, res) => {
    const products = await serviceProdut.findProducts();
    return res.status(200).json({ products });
  },
);

const findProductId = rescue(
  async (req, res) => {
    const { id } = req.params;
    const products = await serviceProdut.findProductId(id);
    return res.status(200).json(products);
  },
);

module.exports = {
  createProduct,
  findProducts,
  findProductId,
};
