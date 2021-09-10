const ProductService = require('../services/checkProduct');
const productModel = require('../models/productModel');

const INVALID_DATA = 422;
const HTTP_INSERT_OK = 201;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = ProductService.checkProduct(name, quantity);
  if (newProduct === 'error length') {
 return res.status(INVALID_DATA).send('"name" length must be at least 5 characters long');
}
  if (newProduct === 'error quantity') {
 return res.status(INVALID_DATA).send('"quantity" must be larger than or equal to 1');
}
  if (newProduct === 'type number') {
 return res.status(INVALID_DATA).send('"quantity" must be a number');
}
  if (newProduct === false) {
 return res.status(INVALID_DATA).send('Product already exists');
}

  const insertedProduct = await productModel.create(name, quantity);

  return res.status(HTTP_INSERT_OK).json(insertedProduct);
};

module.exports = {
  addProduct,
};
