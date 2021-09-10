const productService = require('../services/products');
const errorSchema = require('../schemas/errors');

const insertOne = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.insertOne(name, quantity);
  if (!newProduct) {
    const error = errorSchema(422, 'invalid_data', 'Product already exists');
    return res.status(error.output.statusCode).json(error.output.payload.custom);
  }
  res.status(201).json(newProduct);
};

module.exports = { insertOne };