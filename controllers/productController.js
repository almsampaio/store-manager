const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productService.createProduct(name, quantity);
  if (product.err) {
    return res.status(422).json(product);
  }
  res.status(201).json(product);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.getAllProducts();
  res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const idProduct = await productService.getProductById(id);
  if (!idProduct) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  return res.status(200).json(idProduct); 
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productService.updateProduct(id, name, quantity);
  if (updatedProduct.err) {
    return res.status(422).json(updatedProduct);
  }
  res.status(200).json({ id, name, quantity });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
