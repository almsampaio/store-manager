const productService = require('../services/productService');
const productModel = require('../models/productModel');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const findProductName = await productModel.findByName(name);
  const product = await productService.create(name, quantity);

  if (findProductName) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  res.status(201).json(product);
};

module.exports = {
  create,
};
