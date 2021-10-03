const Products = require('../models/Products');

const getAllProducts = async () => {
  const products = await Products.getAllProducts();

  return { status: 200, data: products };
};

const getProductById = async (id) => {
  const product = await Products.getProductById(id);
  const message = 'Wrong id format';

  if (!product) return { status: 422, message };
  return { status: 200, data: product };
};

const createProduct = async (name, quantity) => {
  const findProduct = await Products.findProductByName(name);
  const message = 'Product already exists';

  if (findProduct) return { status: 422, message };

  const product = await Products.createProduct(name, quantity);

  return { status: 201, data: product };
};

const updateProduct = async (id, data) => {
  const product = await Products.updateProduct(id, data);
  return { status: 200, data: product };
};

const removeProduct = async (id) => {
  const product = await Products.getProductById(id);
  const message = 'Wrong id format';

  if (!product) return { status: 422, message };
  const result = await Products.removeProduct(id);
  return { status: 200, data: result };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
};
