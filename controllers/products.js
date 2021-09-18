const productsService = require('../services/products');
const productModel = require('../models/products');

async function create(req, res) {
  const { name, quantity } = req.body;
  const isExists = await productModel.getName(name);
  if (isExists !== null) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }
    const obj = await productsService.createNewProduct(name, quantity);
    return res.status(201).json(obj);
}

async function getAllProducts(_req, res, next) {
  try {
  const result = await productsService.getAll();
  return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
async function getProductsById(req, res, next) {
  try {
  const { id } = req.params;
  const result = await productModel.getProductsById(id);
  return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  create,
  getAllProducts,
  getProductsById,
};
