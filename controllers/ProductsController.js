const ProductsService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.create({ name, quantity });

  if (!product.name) {
    return res.status(422).json(product);
  }

  return res.status(201).json(product);
};

module.exports = {
  create,
};
