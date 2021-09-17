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

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productService.update(id, name, quantity);
  const newProductId = await productService.getProductsById(id);
  
  res.status(200).json(newProductId);
};

const deleteProduct = async (req, res) => {
  const removeProducts = await productService.deleteProduct(req.params.id);
  if (!removeProducts) {
    return res.status(422).json({ err: {
     code: 'invalid_data',
     message: 'Wrong id format' } });
  }
  res.status(200).json(removeProducts);
};

module.exports = { 
  getProducts,
  getProductsById,
  createdNewProduct,
  deleteProduct,
  update,
};
