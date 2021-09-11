const ProductService = require('../services/checkProduct');
const productModel = require('../models/productModel');
const errors = require('../services/errors');

const INVALID_DATA = 422;
const HTTP_INSERT_OK = 201;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = ProductService.checkProduct(name, quantity);
  if (newProduct === 'error length') {
 return res.status(INVALID_DATA).json({ err: { code: 'invalid_data', message: errors.NAME } });
}
  if (newProduct === 'error quantity') {
 return res.status(INVALID_DATA)
 .json({ err: { code: 'invalid_data', message: errors.QUANTITY } });
}
  if (newProduct === 'type number') {
 return res.status(INVALID_DATA)
 .json({ err: { code: 'invalid_data', message: errors.TYPE_NUMBER } });
}

const insertedProduct = await productModel.create(name, quantity);

if (insertedProduct === false) {
return res.status(INVALID_DATA).json({ err: { code: 'invalid_data', message: errors.EXISTS } });
}
  return res.status(HTTP_INSERT_OK).json(insertedProduct);
};

module.exports = {
  addProduct,
};
