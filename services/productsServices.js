const productsModels = require('../models/productsModels');

const createProduct = async ({ name, quantity }) => {
  const alreadyExists = await productsModels.getProductByName(name);

  if (alreadyExists) {
    return { code: 'invalid_data', type: 422, message: 'Product already exists' };
  }

  const response = await productsModels.createProduct({ name, quantity });
  return response;
};

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModels.getProductById(id);

  if (!product) return { code: 'invalid_data', type: 422, message: 'Wrong id format' };

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await productsModels.updateProduct(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const response = await productsModels.deleteProduct(id);

  if (!response) return { code: 'invalid_data', type: 422, message: 'Wrong id format' };

  return response;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
