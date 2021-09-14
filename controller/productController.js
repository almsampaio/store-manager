const ProductService = require('../services/checkProduct');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.addProduct(name, quantity);
  if (!newProduct.error) return res.status(201).json(newProduct);
  return res.status(newProduct.error).json(newProduct);
};

const getProducts = async (req, res) => {
  const allProducts = await ProductService.getAll();
  return res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (!product) {
 return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
}
  return res.status(200).json(product);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = await ProductService.update(id, name, quantity);
  if (updateProduct.error) {
    return res.status(422).json(updateProduct);
  }

  return res.status(200).json(updateProduct);
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
};
