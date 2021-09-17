const productService = require('../services/productService');

const getProducts = async (_req, res) => {
  const products = await productService.getProducts();
  res.status(200).json({ products });
};

const getProductsById = async (req, res) => {
  const product = await productService.getProductsById(req.params.id);
  if (!product) {
    return res.status(422).json({ err: {
     code: 'invalid_data',
     message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const createdNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createNewProduct(name, quantity);

  res.status(201).json(newProduct);
};

module.exports = { 
  getProducts,
  getProductsById,
  createdNewProduct,
};
