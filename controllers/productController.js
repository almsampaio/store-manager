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

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
};
