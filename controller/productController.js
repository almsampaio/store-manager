const ProductService = require('../services/checkProduct');
const productModel = require('../models/productModel');
const errors = require('../services/errors');

const INVALID_DATA = 422;
const HTTP_INSERT_OK = 201;
const HTTP_OK = 200;

const addOk = async (req, res, name, quantity) => {
  const insertedProduct = await productModel.create(name, quantity);

  if (insertedProduct === false) {
  return res.status(INVALID_DATA).json({ err: { code: 'invalid_data', message: errors.EXISTS } });
  }
    return res.status(HTTP_INSERT_OK).json(insertedProduct);
};

const addProduct = async (req, res, next) => {
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
return next();
};

const getProducts = async (req, res) => {
  const allProducts = await productModel.getAll();
  return res.status(HTTP_OK).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);
  if (!product) {
 return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
}
  return res.status(HTTP_OK).json(product);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  let updateProduct = await productModel.update(id, name, quantity);
  if (!updateProduct) {
 return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
}
  updateProduct = { name, quantity };

  return res.status(HTTP_OK).json(updateProduct);
};

module.exports = {
  addProduct,
  addOk,
  getProducts,
  getProductById,
  updateProductById,
};
