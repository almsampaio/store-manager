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

module.exports = {
  create,
};
